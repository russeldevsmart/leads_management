/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import * as auth from "../Auth";
import { updateUser } from "../Auth/_redux/authCrud";

function AccountInformation(props) {
  const intl = useIntl();
  // Fields
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user, shallowEqual);
  useEffect(() => {}, [user]);

  // Methods
  const saveUser = (values, setStatus, setSubmitting) => {
    setloading(true);
    const updatedUser = Object.assign(user, {
      username: values.username,
      email: values.email,
      language: values.language,
      timeZone: values.timeZone,
    });
    
    let formData = new FormData();
    for (const property in updatedUser) {
      formData.append(property, updatedUser[property]);
    }

    // user for update preparation
    
    updateUser(formData).then((res) => {
      setloading(false);
      setSubmitting(false);
      // user for update preparation
      const resUser = res.data;
      resUser["id"] = resUser._id;
      delete resUser._id;
      dispatch(props.setUser(resUser));
    }).catch((err) => {
      console.log(err);
    });
  };
  // UI Helpers
  const initialValues = {
    username: user.username,
    email: user.email,
    language: user.language,
    timeZone: user.timeZone,
  };
  const Schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Wrong email format")
      .required("Email is required"),
    language: Yup.string(),
    timeZone: Yup.string(),
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
            {intl.formatMessage({id: "PROFILE.ACCOUNT_INFORMATION"})}
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            {intl.formatMessage({id: "PROFILE.CHANGE_ACCOUNT_SETTINGS"})}
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
            to="/user-profile/personal-information"
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
          {/* begin::Heading */}
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mb-6">{intl.formatMessage({id: "PROFILE.ACCOUNT"})}:</h5>
            </div>
          </div>
          {/* begin::Form Group */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">{intl.formatMessage({id: "PROFILE.USERNAME"})}</label>
            <div className="col-lg-9 col-xl-6">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "username"
                  )}`}
                  name="username"
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="invalid-feedback">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* begin::Form Group */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              {intl.formatMessage({id: "PROFILE.EMAIL_ADDRESS"})}
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group input-group-lg input-group-solid">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-at"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "email"
                  )}`}
                  name="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
          </div>
          {/* begin::Form Group */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">{intl.formatMessage({id: "PROFILE.LANGUAGE"})}</label>
            <div className="col-lg-9 col-xl-6">
              <select
                className="form-control form-control-lg form-control-solid"
                name="language"
                {...formik.getFieldProps("language")}
              >
                <option>Select Language...</option>
                <option value="en">English</option>
                <option value="fr">Français - French</option>
              </select>
            </div>
          </div>
          {/* begin::Form Group */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              {intl.formatMessage({id: "PROFILE.TIMEZONE"})}
            </label>
            <div className="col-lg-9 col-xl-6">
              <select
                className="form-control form-control-lg form-control-solid"
                name="timeZone"
                {...formik.getFieldProps("timeZone")}
              >
                <option value="International Date Line West">
                  (GMT-11:00) International Date Line West
                </option>
                <option value="Midway Island">(GMT-11:00) Midway Island</option>

                <option value="Central America">
                  (GMT-06:00) Central America
                </option>
                <option value="Central Time (US &amp; Canada)">
                  (GMT-05:00) Central Time (US &amp; Canada)
                </option>
                <option value="Eastern Time (US &amp; Canada)">
                  (GMT-04:00) Eastern Time (US &amp; Canada)
                </option>
                <option value="Indiana (East)">
                  (GMT-04:00) Indiana (East)
                </option>

                <option value="Georgetown">(GMT-04:00) Georgetown</option>

                <option value="Buenos Aires">(GMT-03:00) Buenos Aires</option>
                <option value="Newfoundland">(GMT-02:30) Newfoundland</option>
                <option value="Mid-Atlantic">(GMT-02:00) Mid-Atlantic</option>
                <option value="Cape Verde Is.">
                  (GMT-01:00) Cape Verde Is.
                </option>
                <option value="UTC">(GMT) UTC</option>
                <option value="Dublin">(GMT+01:00) Dublin</option>
                <option value="Edinburgh">(GMT+01:00) Edinburgh</option>
                <option value="London">(GMT+01:00) London</option>
                <option value="Prague">(GMT+02:00) Prague</option>
                <option value="Helsinki">(GMT+03:00) Helsinki</option>
                <option value="Abu Dhabi">(GMT+04:00) Abu Dhabi</option>
                <option value="Tehran">(GMT+04:30) Tehran</option>
                <option value="Islamabad">(GMT+05:00) Islamabad</option>
                <option value="Karachi">(GMT+05:00) Karachi</option>
                <option value="Tashkent">(GMT+05:00) Tashkent</option>
                <option value="Kathmandu">(GMT+05:45) Kathmandu</option>
                <option value="Astana">(GMT+06:00) Astana</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* end::Form */}
    </form>
  );
}
export default connect(null, auth.actions)(AccountInformation);
