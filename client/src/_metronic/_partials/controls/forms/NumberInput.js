import React from "react";
import {useFormikContext} from "formik";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import NumberFormat from 'react-number-format';

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function NumberInput({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "number",
  ...props
}) {
  const { setFieldValue } = useFormikContext();
  return (
    <>
      {/* {label && <label>{label}</label>} */}
      <NumberFormat
        thousandSeparator={true}
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        onValueChange={val => {
          setFieldValue(field.name, val.value);
        }}
        {...props}
        {...field}
      />
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
