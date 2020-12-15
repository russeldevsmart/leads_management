// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React , { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../_metronic/_partials/controls";
import { categories, categoryColumns } from "../../constants";

// Regular Expression for phone number input
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const dateFields = ["inspection_date", "service_date", "verification_date"];

Yup.addMethod(Yup.string, 'testYear', function(args) {
  const { message } = args;
  return this.test('testYear', message, function(value) {
    const isNumber = /^-?\d+$/.test(value);
    return isNumber && parseInt(value) > 1900 && parseInt(value) < 2050;
  });
});

export function LeadEditForm({
  saveLead,
  lead,
  actionsLoading,
  onHide,
}) {
  const [ category, setCategory ] = useState("buy_cash");
  useEffect(() => {
    if (lead._id) setCategory(lead.category_type);
  }, [lead]);

  // Validation schema
  const LeadEditSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    client_type: Yup.string()
      .required("Client Type is required"),
    comments: Yup.string()
      .required("Comments is required"),
      listing_link: Yup.lazy(value => {
      if (categoryColumns[category].includes("listing_link"))
        return Yup.string().required("Listing Link is required");
      return Yup.mixed().notRequired();
    }),
    make: Yup.lazy(value => {
      if (categoryColumns[category].includes("make")) {
        return Yup.string().required("Make is required");
      }
      return Yup.mixed().notRequired();
    }),
    model: Yup.lazy(value => {
      if (categoryColumns[category].includes("model"))
        return Yup.string().required("Model is required");
      return Yup.mixed().notRequired();
    }),
    year: Yup.lazy(value => {
      if (categoryColumns[category].includes("year"))
        return Yup.string().required("Year is required").testYear({message: "Wrong year format!"});
      return Yup.mixed().notRequired();
    }),
    mileage: Yup.lazy(value => {
      if (categoryColumns[category].includes("mileage"))
        return Yup.string().required("Mileage is required");
      return Yup.mixed().notRequired();
    }),
    requested_price: Yup.lazy(value => {
      if (categoryColumns[category].includes("requested_price"))
        return Yup.string().required("The price requested is required");
      return Yup.mixed().notRequired();
    }),
    budget: Yup.lazy(value => {
      if (categoryColumns[category].includes("budget"))
        return Yup.string().required("Budget is required");
      return Yup.mixed().notRequired();
    }),
    trade_in_budget: Yup.lazy(value => {
      if (categoryColumns[category].includes("trade_in_budget"))
        return Yup.string().required("Trade in budget is required");
      return Yup.mixed().notRequired();
    }),
    status: Yup.lazy(value => {
      if (categoryColumns[category].includes("status"))
        return Yup.string().required("Status is required");
      return Yup.mixed().notRequired();
    }),
    request_type: Yup.lazy(value => {
      if (categoryColumns[category].includes("request_type"))
        return Yup.string().required("Request Type is required");
      return Yup.mixed().notRequired();
    }),
    request: Yup.lazy(value => {
      if (categoryColumns[category].includes("request")) {
        return Yup.string().required("Request is required");
      }
      return Yup.mixed().notRequired();
    }),
    source: Yup.lazy(value => {
      if (categoryColumns[category].includes("source"))
        return Yup.string().required("Source is required");
      return Yup.mixed().notRequired();
    }),
    service: Yup.lazy(value => {
      if (categoryColumns[category].includes("service"))
        return Yup.string().required("Service is required");
      return Yup.mixed().notRequired();
    }),
    service_date: Yup.lazy(value => {
      if (categoryColumns[category].includes("service_date"))
        return Yup.string().required("Service Date is required");
      return Yup.mixed().notRequired();
    }),
    spare_part_requested: Yup.lazy(value => {
      if (categoryColumns[category].includes("spare_part_requested"))
        return Yup.string().required("Spare Part Requested is required");
      return Yup.mixed().notRequired();
    }),
    details: Yup.lazy(value => {
      if (categoryColumns[category].includes("details"))
        return Yup.string().required("Details is required");
      return Yup.mixed().notRequired();
    }),
    verification_date: Yup.lazy(value => {
      if (categoryColumns[category].includes("verification_date"))
        return Yup.string().required("Verification Date is required");
      return Yup.mixed().notRequired();
    }),
    inspection_date: Yup.lazy(value => {
      if (categoryColumns[category].includes("inspection_date"))
        return Yup.string().required("Inspection Date is required");
      return Yup.mixed().notRequired();
    }),
  });

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={lead}
        validationSchema={LeadEditSchema}
        onSubmit={(values) => {
          saveLead({...values, category_type: category});
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
                    />
                  </div>
                  {/* Phone */}
                  <div className="col-lg-4 mb-5">
                    <Field
                      name="phone"
                      component={Input}
                      placeholder="Phone"
                      label="Phone"
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
                    />
                  </div>
                </div>
                <div className="form-group row mb-1">
                {
                  categoryColumns[category].length > 0 && (
                    categoryColumns[category].map((column, index) => {
                      const label = column.charAt(0).toUpperCase() + column.replaceAll('_', ' ').slice(1);
                      return (
                        <div className="col-lg-4 mb-6" key={index}>
                          {
                            dateFields.includes(column) ? (
                              <DatePickerField
                                name={column}
                                label={label}
                              />
                            ) : (
                              <Field
                                type="text"
                                name={column}
                                component={Input}
                                placeholder={label}
                                label={label}
                              />
                            )
                          }
                        </div>
                      )
                    })
                  )
                }
                </div>

                <div className="form-group row">
                  {/* Client Type */}
                  <div className="col-lg-4">
                    <Field
                      type="text"
                      name="client_type"
                      component={Input}
                      placeholder="Client Type"
                      label="Client Type"
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
