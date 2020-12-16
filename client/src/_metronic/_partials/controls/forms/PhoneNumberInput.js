import React from "react";
import PhoneInput from 'react-phone-input-2';
import {Spinner} from "react-bootstrap";

import 'react-phone-input-2/lib/material.css'

const getFieldCSSClasses = (loading, isValid) => {
  const classes = ["form-control"];
  if (!loading && isValid === "VALID") {
    classes.push("is-valid");
  }
  if (!loading && isValid === "INVALID") {
    classes.push("is-invalid");
  }
  return classes.join(" ");
};

export function PhoneNumberInput({
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "tel",
  isValid,
  loading,
  ...props
}) {
  return (
    <>
      {label && <label>{label}</label>}
      <PhoneInput
        autoFormat={true}
        specialLabel=" "
        inputProps={{
          name: props.name,
          className: getFieldCSSClasses(loading, isValid)
        }}
        {...props}
      />
      {
        loading && (
          <Spinner
            animation="border"
            variant="danger"
            size="sm" 
            style={{
              position: 'absolute',
              right: '20px',
              top: '36px'
            }}
          />
        )
      }
      {
        !loading && isValid === "NOTHING" && (
          <div className="feedback">Please input <b>{label}</b></div>
        )
      }
      {
        !loading && isValid === "VALID" && (
          <div className="valid-feedback">{label} was entered correct</div>
        )
      }
      {
        !loading && isValid === "INVALID" && (
          <div className="invalid-feedback">{customFeedbackLabel}</div>
        )
      }
    </>
  );
}
