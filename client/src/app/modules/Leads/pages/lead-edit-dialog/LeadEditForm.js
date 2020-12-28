import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/leadsActions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Input,
  SearchSelect,
  NumberInput,
  PhoneNumberInput,
  Select,
  DatePickerField,
} from "../../../../../_metronic/_partials/controls";
import * as uiHelpers from "../LeadsUIHelpers";
import { KTUtil } from "./../../../../../_metronic/_assets/js/components/util";
import { statusList } from "../../constants";

// Field types
const dateFields = ["inspection_date", "date_maintenance"];
const numberFields = ["offered_price", "desired_price", "budget", "mileage"];

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

export function LeadEditForm({ saveLead, lead, actionsLoading, onHide }) {
  const intl = useIntl();
  useEffect(() => {
    // Init Lead Timeline Scroll
    const timelineContainer = KTUtil.getById("lead_timeline_container");
    KTUtil.scrollInit(timelineContainer, {
      disableForMobile: true,
      resetHeightOnDestroy: true,
      handleWindowResize: true,
      height: 600,
    });
  }, []);

  // Leads Redux state
  const dispatch = useDispatch();
  const { makes, models } = useSelector(
    (state) => ({
      makes: state.leads.makes,
      models: state.leads.models,
    }),
    shallowEqual
  );

  const [category, setCategory] = useState("new_cars");
  const [phoneValid, setPhoneValid] = useState("NOTHING");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (lead._id) {
      setCategory(lead.category);
      setPhoneNumber(lead.phone);
    }
  }, [lead]);

  // Validation schema
  const LeadEditSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email"),
  });

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleMakeChange = (options) => {
    if (options && options.length > 0) {
      const makeIds = options.map((option) => {
        return option.value;
      });
      dispatch(actions.fetchCarModels(makeIds));
    }
  };

  const handlePhoneInput = async (phone) => {
    if (!phone) {
      setPhoneValid("NOTHING");
      return;
    }
    setPhoneLoading(false);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(async function () {
        setPhoneLoading(true);
        try {
          const res = await axios.get(
            `/api/rest/verify-phone-number?number=${phone}`
          );
          setPhoneLoading(false);
          if (res.data.valid === true) {
            setPhoneValid("VALID");
            setPhoneNumber(res.data.international_format);
          } else setPhoneValid("INVALID");
        } catch (error) {
          console.log(error);
          setPhoneLoading(false);
          setPhoneValid("INVALID");
        }
      }, 800)
    );
  };

  const createLead = (values) => {
    let newValues = values;
    // Format number fields
    numberFields.forEach((elem) => {
      if (typeof newValues[elem] === "string")
        newValues[elem] = parseFloat(newValues[elem].replaceAll(",", ""));
    });
    const diffKeys = uiHelpers.getDiffKeys(newValues, lead);
    if (lead._id) {
      saveLead({
        ...newValues,
        phone: phoneNumber,
        comments: comment,
        diffKeys: diffKeys,
        category,
      });
    } else
      saveLead({
        ...newValues,
        phone: phoneNumber,
        comments: comment,
        category,
      });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={lead}
        validationSchema={LeadEditSchema}
        onSubmit={(values) => {
          if (phoneValid === "INVALID" || phoneLoading === true) return;
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
              <div className="row">
                <div className="col-md-6 border-right-primary border-right-md px-md-10">
                  <Form className="form form-label-right">
                    <div className="form-group">
                      <Select
                        name="category"
                        label={intl.formatMessage({ id: "LEAD.CATEGORY" })}
                        onChange={handleChangeCategory}
                        value={category}
                      >
                        {uiHelpers.categories &&
                          uiHelpers.categories.map((cat, index) => {
                            return (
                              <option value={cat.value} key={index}>
                                {cat.name}
                              </option>
                            );
                          })}
                      </Select>
                    </div>
                    <label className="text-primary font-weight-bolder">
                      {intl.formatMessage({ id: "LEAD.DETAILS" })}:
                    </label>
                    <div className="form-group row">
                      <div className="col-md-6">
                        {/* Client Type */}
                        <SearchSelect
                          name="client_type"
                          label={intl.formatMessage({ id: "LEAD.CLIENT_TYPE" })}
                          options={uiHelpers.clientList}
                        />
                      </div>
                      <div className="col-md-6">
                        {/* Name */}
                        <Field
                          name="name"
                          component={Input}
                          placeholder={intl.formatMessage({ id: "LEAD.NAME" })}
                          label={intl.formatMessage({ id: "LEAD.NAME" })}
                          withFeedbackLabel={true}
                        />
                      </div>
                    </div>
                    <div className="form-group position-relative">
                      {/* Phone */}
                      <PhoneNumberInput
                        name="phone"
                        label={intl.formatMessage({ id: "LEAD.PHONE_NUMBER" })}
                        country="ci"
                        placeholder={intl.formatMessage({
                          id: "LEAD.PHONE_NUMBER",
                        })}
                        value={phoneNumber}
                        onChange={handlePhoneInput}
                        isValid={phoneValid}
                        customFeedbackLabel={"Wrong format!"}
                        loading={phoneLoading}
                      />
                    </div>
                    <div className="form-group">
                      {/* Email */}
                      <Field
                        type="email"
                        name="email"
                        component={Input}
                        placeholder={intl.formatMessage({ id: "LEAD.EMAIL" })}
                        label={intl.formatMessage({ id: "LEAD.EMAIL" })}
                        withFeedbackLabel={true}
                      />
                    </div>
                    <label className="text-primary font-weight-bolder">
                      {intl.formatMessage({ id: "LEAD.INTEREST_DETAILS" })}:
                    </label>
                    {uiHelpers.categoryColumns[category].map(
                      (column, index) => {
                        if (column === "make") {
                          return (
                            <div className="form-group" key={index}>
                              {/* Make */}
                              <SearchSelect
                                name="make"
                                label={intl.formatMessage({ id: "LEAD.MAKE" })}
                                isMulti={true}
                                options={makes}
                                changeFunc={handleMakeChange}
                              />
                            </div>
                          );
                        } else if (column === "model") {
                          return (
                            <div className="form-group" key={index}>
                              {/* Model */}
                              <SearchSelect
                                name="model"
                                label={intl.formatMessage({ id: "LEAD.MODEL" })}
                                isMulti={true}
                                options={models}
                              />
                            </div>
                          );
                        } else if (column === "year") {
                          return (
                            <div className="form-group" key={index}>
                              {/* Year */}
                              <Select
                                name="year"
                                label={intl.formatMessage({ id: "LEAD.YEAR" })}
                                withFeedbackLabel={true}
                              >
                                {uiHelpers.years &&
                                  uiHelpers.years.map((year, j) => {
                                    return (
                                      <option value={year} key={j}>
                                        {year}
                                      </option>
                                    );
                                  })}
                              </Select>
                            </div>
                          );
                        } else if (column === "service") {
                          return (
                            <div className="form-group" key={index}>
                              {/* Service */}
                              <SearchSelect
                                name="service"
                                label={intl.formatMessage({
                                  id: "LEAD.SERVICE",
                                })}
                                isMulti={true}
                                options={uiHelpers.serviceOptions}
                              />
                            </div>
                          );
                        } else if (column === "reprise") {
                          return (
                            <div className="form-group" key={index}>
                              {/* Reprise */}
                              <Field
                                name="reprise"
                                render={({ field }) => (
                                  <div className="d-flex align-items-center">
                                    <label className="mb-0 mr-3">
                                      {intl.formatMessage({
                                        id: "LEAD.REPRISE",
                                      })}
                                      :
                                    </label>
                                    <div className="form-check form-check-inline">
                                      <input
                                        {...field}
                                        id="yes"
                                        value="yes"
                                        checked={field.value === "yes"}
                                        name="reprise"
                                        type="radio"
                                        className="form-check-input"
                                      />
                                      <label
                                        htmlFor="yes"
                                        className="form-check-label"
                                      >
                                        Oui
                                      </label>
                                    </div>

                                    <div className="form-check form-check-inline">
                                      <input
                                        {...field}
                                        id="no"
                                        value="no"
                                        name="reprise"
                                        checked={field.value === "no"}
                                        type="radio"
                                        className="form-check-input"
                                      />
                                      <label
                                        htmlFor="no"
                                        className="form-check-label"
                                      >
                                        Non
                                      </label>
                                    </div>
                                  </div>
                                )}
                              />
                            </div>
                          );
                        } else if (numberFields.includes(column)) {
                          return (
                            <div className="form-group" key={index}>
                              <Field
                                type="number"
                                name={column}
                                component={NumberInput}
                                placeholder={intl.formatMessage({
                                  id: `LEAD.${column.toUpperCase()}`,
                                })}
                                label={intl.formatMessage({
                                  id: `LEAD.${column.toUpperCase()}`,
                                })}
                                suffix={`${
                                  column === "mileage" ? " KM" : " CFA"
                                }`}
                              />
                            </div>
                          );
                        } else if (dateFields.includes(column)) {
                          return (
                            <div className="form-group" key={index}>
                              <DatePickerField
                                name={column}
                                label={intl.formatMessage({
                                  id: `LEAD.${column.toUpperCase()}`,
                                })}
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div className="form-group" key={index}>
                              <Field
                                name={column}
                                component={Input}
                                placeholder={intl.formatMessage({
                                  id: `LEAD.${column.toUpperCase()}`,
                                })}
                                label={intl.formatMessage({
                                  id: `LEAD.${column.toUpperCase()}`,
                                })}
                                withFeedbackLabel={true}
                              />
                            </div>
                          );
                        }
                      }
                    )}
                    <label className="text-primary font-weight-bolder">
                      {intl.formatMessage({ id: "LEAD.STATUS_DETAILS" })}:
                    </label>
                    <div className="form-group">
                      {/* Status */}
                      <SearchSelect
                        name="status"
                        label="Status"
                        options={statusList}
                        formatOptionLabel={colorOptionLabel}
                      />
                    </div>
                    <div className="form-group">
                      {/* Source */}
                      <SearchSelect
                        name="source"
                        label="Source"
                        options={uiHelpers.sourceList}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button
                        className="btn btn-block btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                      >
                        {intl.formatMessage({ id: "FORM.SAVE_CHANGES" })}
                      </button>
                    </div>
                  </Form>
                </div>
                <div className="col-md-6 border-left-primary border-left-md px-md-10">
                  <div className="d-flex flex-column justify-content-between h-100">
                    <div
                      className="timeline timeline-2 pr-3"
                      id="lead_timeline_container"
                    >
                      <div className="timeline-bar"></div>
                      {lead.comments &&
                        lead.comments.length > 0 &&
                        lead.comments.map((comment, index) => {
                          const color =
                            comment.type === "comments" ? "" : "bg-primary";
                          return (
                            <div className="timeline-item" key={index}>
                              <div className={`timeline-badge ${color}`}></div>
                              <div className="timeline-content d-flex align-items-center justify-content-between">
                                <span className="mr-3">
                                  {comment.type === "comments" && (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: intl.formatMessage(
                                          { id: "LEAD.COMMENTS.WRITE_COMMENT" },
                                          {
                                            name: `<span class="text-primary font-weight-bold">${comment.created_by.fullname}</span>`,
                                            comment: `<b>${comment.content}</b>`,
                                          }
                                        ),
                                      }}
                                    ></div>
                                  )}
                                  {comment.type === "action_created" && (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: intl.formatMessage(
                                          { id: "LEAD.COMMENTS.CREATED_BY" },
                                          {
                                            name: `<span class="text-primary font-weight-bold">${comment.created_by.fullname}</span>`,
                                          }
                                        ),
                                      }}
                                    ></div>
                                  )}
                                  {comment.type === "action_updated" && (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: intl.formatMessage(
                                          { id: "LEAD.COMMENTS.UPDATED_BY" },
                                          {
                                            name: `<span class="text-primary font-weight-bold">${comment.created_by.fullname}</span>`,
                                            content: `<b>${comment.content}</b>`,
                                          }
                                        ),
                                      }}
                                    ></div>
                                  )}
                                </span>
                                <span className="text-muted text-right">
                                  {intl.formatMessage(
                                    {
                                      id: `DATE.${
                                        uiHelpers.getTimeSince(
                                          comment.created_on
                                        ).unit
                                      }_AGO`,
                                    },
                                    {
                                      number: uiHelpers.getTimeSince(
                                        comment.created_on
                                      ).number,
                                    }
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <form>
                      <div className="form-group">
                        <textarea
                          rows={5}
                          name="comment"
                          className="form-control"
                          placeholder={`${intl.formatMessage({
                            id: "LEAD.COMMENTS",
                          })}...`}
                          value={comment}
                          onChange={handleCommentChange}
                        ></textarea>
                      </div>
                      <div className="form-group mb-0">
                        <button
                          className="btn btn-block btn-outline-success"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                          }}
                        >
                          {intl.formatMessage({ id: "LEAD.ADD_COMMENT" })}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Formik>
    </>
  );
}
