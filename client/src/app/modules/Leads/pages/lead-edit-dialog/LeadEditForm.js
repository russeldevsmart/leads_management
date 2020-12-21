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
  NumberInput,
  PhoneNumberInput
} from "../../../../../_metronic/_partials/controls";
import * as uiHelpers from "../LeadsUIHelpers";
import { statusList } from "../../constants";

// Field types
// const dateFields = ["inspection_date", "service_date", "verification_date"];
// const selectFields = ["make", "model", "status"];
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

  // const [ category, setCategory ] = useState("buy_cash");
  const [ phoneValid, setPhoneValid ] = useState("NOTHING");
  const [ typingTimeout, setTypingTimeout ] = useState(null);
  const [ phoneLoading, setPhoneLoading ] = useState(false);
  const [ phoneNumber, setPhoneNumber ] = useState("");
  const [ comment, setComment ] = useState("");

  useEffect(() => {
    if (lead._id) {
      // setCategory(lead.category_type);
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

  // const handleChangeCategory = (e) => {
  //   setCategory(e.target.value);
  // }

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  }

  const handleMakeChange = (options) => {
    const makeIds = options.map((option) => { return option.value });
    dispatch(actions.fetchCarModels(makeIds));
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
      }, 800)
    )
  }

  const createLead = (values) => {
    let newValues = values;
    // Format number fields
    numberFields.forEach(elem => {
      if (typeof newValues[elem] === "string")
        newValues[elem] = parseFloat(newValues[elem].replaceAll(",", ""));
    });
    saveLead({...newValues, phone: phoneNumber, comments: comment});
  }

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
                    {/* <div className="form-group">
                      Category
                      <Select name="category" label="Category" onChange={handleChangeCategory} value={category} >
                        {
                          categories && categories.map((cat, index) => {
                            return (
                              <option value={cat.value} key={index}>{cat.name}</option>
                            )
                          })
                        }
                      </Select>
                    </div> */}
                    <label className="text-primary font-weight-bolder">LEAD DETAILS:</label>
                    <div className="form-group">
                      {/* Name */}
                      <Field
                        name="name"
                        component={Input}
                        placeholder="Name"
                        label="Name"
                        withFeedbackLabel={true}
                      />
                    </div>
                    <div className="form-group position-relative">
                      {/* Phone */}
                        <PhoneNumberInput
                          name="phone"
                          label="Phone Number"
                          country="ci"
                          placeholder="Phone"
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
                        placeholder="Email"
                        label="Email"
                        withFeedbackLabel={true}
                      />
                    </div>
                    <label className="text-primary font-weight-bolder">INTEREST DETAILS:</label>
                    <div className="form-group">
                      {/* Make */}
                      <SearchSelect
                        name="make"
                        label="Make"
                        isMulti={true}
                        options={makes}
                        changeFunc={handleMakeChange}
                      />
                    </div>

                    <div className="form-group">
                      {/* Model */}
                      <SearchSelect
                        name="model"
                        label="Model"
                        isMulti={true}
                        options={models}
                      />
                    </div>
                    <div className="form-group">
                      {/* Budget */}
                      <Field
                        type="number"
                        name="budget"
                        component={NumberInput}
                        placeholder="Budget"
                        label="Budget"
                        suffix=" CFA"
                      />
                    </div>
                    <label className="text-primary font-weight-bolder">STATUS DETAILS:</label>
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
                      <Field
                        name="source"
                        component={Input}
                        placeholder="Source"
                        label="Source"
                        withFeedbackLabel={true}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button
                        className="btn btn-block btn-primary"
                        onClick={(e) => { e.preventDefault(); handleSubmit() }}>
                          SAVE CHANGES
                      </button>
                    </div>
                  </Form>
                </div>
                <div className="col-md-6 border-left-primary border-left-md px-md-10">
                  <div className="d-flex flex-column justify-content-between h-100">
                    <div className="timeline timeline-2">
                      <div className="timeline-bar"></div>
                      {
                        lead.comments && lead.comments.length > 0 && lead.comments.map((comment, index) => {
                          return (
                            <div className="timeline-item" key={index}>
                              <div className={`timeline-badge ${uiHelpers.timelineColors[Math.floor(Math.random() * 100) % 6]}`}></div>
                              <div className="timeline-content d-flex align-items-center justify-content-between">
                                  <span className="mr-3">
                                    {comment.content}
                                  </span>
                                  <span className="text-muted text-right">{uiHelpers.getTimeSince(comment.created_on)}</span>
                              </div>
                          </div>
                          )
                        })
                      }
                    </div>
                    <form>
                      <div className="form-group">
                        <textarea rows={5} name="comment" className="form-control" placeholder="Comments..." value={comment} onChange={handleCommentChange}>
                        </textarea>
                      </div>
                      <div className="form-group mb-0">
                        <button className="btn btn-block btn-outline-success" onClick={(e) => { e.preventDefault(); handleSubmit(); } }>ADD A COMMENT</button>
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
