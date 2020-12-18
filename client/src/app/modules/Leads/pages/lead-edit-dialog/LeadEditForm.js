import React , { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/leadsActions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Input,
  SearchSelect,
  Select,
  DatePickerField,
  NumberInput,
  PhoneNumberInput
} from "../../../../../_metronic/_partials/controls";
import { categories, categoryColumns, years, clientList, statusList } from "../../constants";

// Field types
const dateFields = ["inspection_date", "service_date", "verification_date"];
const selectFields = ["make", "model", "status"];
const numberFields = ["trade_in_budget", "requested_price", "budget", "mileage"];

// Custom React-Select Option Label
const colorOptionLabel = ({ value, label, color }) => (
  <div className="d-flex align-items-center">
    <div className={`mr-2 bg-${color}`} style={{width: '20px', height: '20px', borderRadius: '50%'}}>
    </div>
    <div>{label}</div>
  </div>
);

export function LeadEditForm({
  saveLead,
  lead,
  actionsLoading,
  onHide,
}) {

  // Leads Redux state
  const dispatch = useDispatch();
  const { makes, models } = useSelector(
    (state) => ({
      makes: state.leads.makes,
      models: state.leads.models,
    }),
    shallowEqual
  );

  const [ category, setCategory ] = useState("buy_cash");
  const [ phoneValid, setPhoneValid ] = useState("NOTHING");
  const [ typingTimeout, setTypingTimeout ] = useState(null);
  const [ phoneLoading, setPhoneLoading ] = useState(false);
  const [ phoneNumber, setPhoneNumber ] = useState("");

  useEffect(() => {
    if (lead._id) {
      setCategory(lead.category_type);
      setPhoneNumber(lead.phone);
    }
  }, [lead]);

  // Validation schema
  const LeadEditSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email"),
  });

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleMakeChange = (option) => {
    dispatch(actions.fetchCarModels(option.value));
  }

  const handlePhoneInput = async (phone) => {
    if (!phone) {
      setPhoneValid("NOTHING");
      return;
    }
    setPhoneLoading(false);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(async function() {
        setPhoneLoading(true);
        try {
          const res = await axios.get(`/api/rest/verify-phone-number?number=${phone}`);
          setPhoneLoading(false);
          if (res.data.valid === true) {
            setPhoneValid("VALID");
            setPhoneNumber(res.data.international_format);
          }
          else
            setPhoneValid("INVALID");
        } catch (error) {
          console.log(error);
          setPhoneLoading(false);
          setPhoneValid("INVALID");
        }
      }, 1000)
    )
  }

  const createLead = (values) => {
    let newValues = values;
    // Format number fields
    numberFields.forEach(elem => {
      if (typeof newValues[elem] === "string")
        newValues[elem] = parseFloat(newValues[elem].replaceAll(",", ""));
    });
    saveLead({...newValues, category_type: category, phone: phoneNumber});
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={lead}
        validationSchema={LeadEditSchema}
        onSubmit={(values) => {
          if (phoneValid === "INVALID") return;
          createLead(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Category */}
                  <div className="col-lg-4">
                    <Select name="category" label="Category" onChange={handleChangeCategory} value={category} >
                      {
                        categories && categories.map((cat, index) => {
                          return (
                            <option value={cat.value} key={index}>{cat.name}</option>
                          )
                        })
                      }
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  {/* Name */}
                  <div className="col-lg-4 mb-5">
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Name"
                      label="Name"
                      withFeedbackLabel={true}
                    />
                  </div>
                  {/* Phone */}
                  <div className="col-lg-4 mb-5">
                    <PhoneNumberInput
                      name="phone"
                      label="phone"
                      country="ci"
                      placeholder="Phone"
                      value={phoneNumber}
                      onChange={handlePhoneInput}
                      isValid={phoneValid}
                      customFeedbackLabel={"Wrong format!"}
                      loading={phoneLoading}
                    />
                  </div>
                  {/* Email */}
                  <div className="col-lg-4 mb-5">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                      withFeedbackLabel={true}
                    />
                  </div>
                </div>
                <div className="form-group row mb-1">
                {
                  categoryColumns[category].length > 0 && (
                    categoryColumns[category].map((column, index) => {
                      const label = column.charAt(0).toUpperCase() + column.replaceAll('_', ' ').slice(1);
                      if (column === 'year') {
                        return (
                          <div className="col-lg-4 mb-6" key={index}>
                            <Select name={column} label={label}>
                              {
                                years && years.map((year, index) => {
                                  return (
                                    <option value={year} key={index}>{year}</option>
                                  )
                                })
                              }
                            </Select>
                          </div>
                        )
                      }
                      else if (dateFields.includes(column)) {
                        return (
                          <div className="col-lg-4 mb-6" key={index}>
                            <DatePickerField
                              name={column}
                              label={label}
                            />
                          </div>
                        )
                      }
                      else if (selectFields.includes(column) && column === 'make') {
                        return (
                          <div className="col-lg-4 mb-6" key={index}>
                            <SearchSelect
                              name={column}
                              label={label}
                              options={makes}
                              changeFunc={handleMakeChange}
                            />
                          </div>
                        )
                      }
                      else if (selectFields.includes(column) && column === 'model') {
                        return (
                          <div className="col-lg-4 mb-6" key={index}>
                            <SearchSelect
                              name={column}
                              label={label}
                              options={models}
                            />
                          </div>
                        )
                      }
                      else if (selectFields.includes(column) && column === 'status') {
                        return (
                          <div className="col-lg-4 mb-6" key={index}>
                            <SearchSelect
                              name={column}
                              label={label}
                              options={statusList}
                              formatOptionLabel={colorOptionLabel}
                            />
                          </div>
                        )
                      }
                      else if (numberFields.includes(column)) {
                        return (
                          <div className="col-lg-4 mb-6" key={index}>
                            <Field
                              type="number"
                              name={column}
                              component={NumberInput}
                              placeholder={label}
                              label={label}
                              suffix={column === 'mileage' ? " KM" : " CFA"}
                            />
                          </div>
                        )
                      }
                      else {
                        return (
                          <div className="col-lg-4 mb-6" key={index}>
                            <Field
                              type="text"
                              name={column}
                              component={Input}
                              placeholder={label}
                              label={label}
                            />
                          </div>
                        )
                      }
                    })
                  )
                }
                </div>

                <div className="form-group row">
                  {/* Client Type */}
                  <div className="col-lg-4">
                    <SearchSelect
                      name="client_type"
                      label="Client Type"
                      options={clientList}
                    />
                  </div>
                  {/* Comments */}
                  <div className="col-lg-8">
                    <Field
                      type="textarea"
                      name="comments"
                      component={Input}
                      placeholder="Comments"
                      label="Comments"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
