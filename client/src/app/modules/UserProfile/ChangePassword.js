/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { useSelector, shallowEqual, connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import SVG from "react-inlinesvg";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import * as auth from "../Auth";
import { changePassword } from "../Auth/_redux/authCrud";

function ChangePassword(props) {
  const intl = useIntl();
  // Fields
  const [loading, setloading] = useState(false);
  const [isError, setisError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const user = useSelector((state) => state.auth.user, shallowEqual);
  useEffect(() => {}, [user]);
  // Methods
  const saveUser = (values, setStatus, setSubmitting) => {
    setloading(true);
    setisError(false);
    changePassword({curPassword: values.currentPassword, newPassword: values.password, userId: user.id})
    .then((res) => {
      setloading(false);
      setSubmitting(false);
      // dispatch(props.setUser(updatedUser));
    }).catch((err) => {
      setloading(false);
      setSubmitting(false);
      setErrMsg(err.response.data.message);
      setisError(true);
    });
  };
  // UI Helpers
  const initialValues = {
    currentPassword: "",
    password: "",
    cPassword: "",
  };
  const Schema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    password: Yup.string().required("New Password is required"),
    cPassword: Yup.string()
      .required("Password confirmation is required")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
  });
  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      saveUser(values, setStatus, setSubmitting);
    },
    onReset: (values, { resetForm }) => {
      resetForm();
    },
  });

  return (
    <form className="card card-custom" onSubmit={formik.handleSubmit}>
      {loading && <ModalProgressBar />}

      {/* begin::Header */}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            {intl.formatMessage({id: "PROFILE.CHANGE_PASSWORD"})}
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            {intl.formatMessage({id: "PROFILE.CHANGE_YOUR_PASSWORD"})}
          </span>
        </div>
        <div className="card-toolbar">
          <button
            type="submit"
            className="btn btn-success mr-2"
            disabled={
              formik.isSubmitting || (formik.touched && !formik.isValid)
            }
          >
            {intl.formatMessage({id: "FORM.SAVE_CHANGES"})}
            {formik.isSubmitting}
          </button>
          <Link
            to="/user-profile/profile-overview"
            className="btn btn-secondary"
          >
            {intl.formatMessage({id: "FORM.CANCEL"})}
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Form */}
      <div className="form">
        <div className="card-body">
          {/* begin::Alert */}
          {isError && (
            <div
              className="alert alert-custom alert-light-danger fade show mb-10"
              role="alert"
            >
              <div className="alert-icon">
                <span className="svg-icon svg-icon-3x svg-icon-danger">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Code/Info-circle.svg")}
                  ></SVG>{" "}
                </span>
              </div>
              <div className="alert-text font-weight-bold">
                {errMsg}
              </div>
              <div className="alert-close" onClick={() => setisError(false)}>
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i className="ki ki-close"></i>
                  </span>
                </button>
              </div>
            </div>
          )}
          {/* end::Alert */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
              {intl.formatMessage({id: "PROFILE.CURRENT_PASSWORD"})}
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="password"
                placeholder={intl.formatMessage({id: "PROFILE.CURRENT_PASSWORD"})}
                className={`form-control form-control-lg form-control-solid mb-2 ${getInputClasses(
                  "currentPassword"
                )}`}
                name="currentPassword"
                {...formik.getFieldProps("currentPassword")}
              />
              {formik.touched.currentPassword &&
              formik.errors.currentPassword ? (
                <div className="invalid-feedback">
                  {formik.errors.currentPassword}
                </div>
              ) : null}
              <a href="#" className="text-sm font-weight-bold">
                {intl.formatMessage({id: "PROFILE.FORGOT_PASSWORD"})} ?
              </a>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
              {intl.formatMessage({id: "PROFILE.NEW_PASSWORD"})}
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="password"
                placeholder={intl.formatMessage({id: "PROFILE.NEW_PASSWORD"})}
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "password"
                )}`}
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
              {intl.formatMessage({id: "PROFILE.VERIFY_PASSWORD"})}
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="password"
                placeholder={intl.formatMessage({id: "PROFILE.VERIFY_PASSWORD"})}
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "cPassword"
                )}`}
                name="cPassword"
                {...formik.getFieldProps("cPassword")}
              />
              {formik.touched.cPassword && formik.errors.cPassword ? (
                <div className="invalid-feedback">
                  {formik.errors.cPassword}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* end::Form */}
    </form>
  );
}

export default connect(null, auth.actions)(ChangePassword);
