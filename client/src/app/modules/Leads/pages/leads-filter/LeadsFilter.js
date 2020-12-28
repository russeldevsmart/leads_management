import React, { useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { Formik } from "formik";
import { isEqual } from "lodash";
import Select from "react-select";
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as uiHelpers from "../LeadsUIHelpers";
import { useLeadsUIContext } from "../LeadsUIContext";
import * as actions from "../../_redux/leadsActions";

const prepareFilter = (queryParams, values) => {
  const { status, source, make, model, price } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? status : undefined;
  // Filter by source
  filter.source = source !== "" ? source : undefined;
  // Filter by make
  filter.make = make !== "" ? make : undefined;
  // Filter by model
  filter.model = model !== "" ? model : undefined;
  // Filter by price
  filter.price = price !== "" ? price : undefined;
  newQueryParams.filter = filter;
  return newQueryParams;
};

// Custom React-Select Option Label
const colorOptionLabel = ({ value, label, color }) => (
  <div className="d-flex align-items-center">
    <div
      className={`mr-2 bg-${color}`}
      style={{ width: "20px", height: "20px", borderRadius: "50%" }}
    ></div>
    <div>{label}</div>
  </div>
);

export function LeadsFilter({ listLoading }) {
  const intl = useIntl();
  // Leads Redux state
  const dispatch = useDispatch();
  const { makes, models } = useSelector(
    (state) => ({
      makes: state.leads.makes,
      models: state.leads.models,
    }),
    shallowEqual
  );
  // Leads UI Context
  const leadsUIContext = useLeadsUIContext();
  const leadsUIProps = useMemo(() => {
    return {
      queryParams: leadsUIContext.queryParams,
      setQueryParams: leadsUIContext.setQueryParams,
    };
  }, [leadsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(leadsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, leadsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      leadsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: "",
          source: "",
          make: "",
          model: "",
          price: [0, 999999],
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <Select
                  name="status"
                  placeholder={intl.formatMessage({id: "PLACEHOLDER.SELECT_STATUS"})}
                  isClearable={true}
                  options={uiHelpers.statusList}
                  formatOptionLabel={colorOptionLabel}
                  onChange={(option) => {
                    if (option)
                      setFieldValue("status", option.value);
                    else
                      setFieldValue("status", null);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted" 
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({id: "FILTER.FILTER_STATUS"})
                  }}>
                </small>
              </div>
              <div className="col-lg-2">
                <Select
                  name="source"
                  placeholder={intl.formatMessage({id: "PLACEHOLDER.SELECT_SOURCE"})}
                  isClearable={true}
                  options={uiHelpers.sourceList}
                  onChange={(option) => {
                    if (option)
                      setFieldValue("source", option.value);
                    else
                      setFieldValue("source", null);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted" 
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({id: "FILTER.FILTER_SOURCE"})
                  }}>
                </small>
              </div>
              <div className="col-lg-2">
                <Select
                  name="make"
                  placeholder={intl.formatMessage({id: "PLACEHOLDER.SELECT_MAKE"})}
                  isClearable={true}
                  options={makes}
                  onChange={(option) => {
                    if (option) {
                      dispatch(actions.fetchCarModels([option.value]));
                      setFieldValue("make", option._id);
                      if (option._id !== values.make)
                        setFieldValue("model", null);
                    }
                    else {
                      dispatch(actions.fetchCarModels([]));
                      setFieldValue("make", null);
                      setFieldValue("model", null);
                    }
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted" 
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({id: "FILTER.FILTER_MAKE"})
                  }}>
                </small>
              </div>
              <div className="col-lg-2">
                <Select
                  isClearable={true}
                  name="model"
                  placeholder={intl.formatMessage({id: "PLACEHOLDER.SELECT_MODEL"})}
                  options={models}
                  value={models && models.filter(option => values.model === option._id)}
                  onChange={(option) => {
                    if (option)
                      setFieldValue("model", option._id);
                    else
                      setFieldValue("model", null);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted" 
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({id: "FILTER.FILTER_MODEL"})
                  }}>
                </small>
              </div>
              <div className="col-lg-2">
                <Range
                  defaultValue={values.price}
                  className="mb-1"
                  tipFormatter={(value) => {
                    console.log(value)
                  }}
                  min={0}
                  max={999999}
                  step={1}
                  onChange={(values) => {
                    setFieldValue("price", values);
                  }}
                  onAfterChange={(values) => {
                    setFieldValue("price", values);
                    handleSubmit();
                  }}
                />
                <span className="text-dark-75">
                  <b>{values.price ? values.price[0] : 0}</b> CFA ~ <b>{values.price ? values.price[1] : 0}</b> CFA
                </span>
                <small className="form-text text-muted" 
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({id: "FILTER.FILTER_BUDGET"})
                  }}>
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
