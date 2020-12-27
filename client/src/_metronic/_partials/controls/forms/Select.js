import React from "react";
import {useField, useFormikContext} from "formik";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import CustomSelect from "react-select";
import { useIntl } from "react-intl";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control", "form-control-solid"];
  if (touched && errors) {
    classes.push("is-invalid-select");
  }

  if (touched && !errors) {
    classes.push("is-valid-select");
  }

  return classes.join(" ");
};

const getSelectValues = (isMulti, options, fieldValue) => {
  if (!options) return null;
  if (isMulti === true) {
    if (fieldValue && fieldValue.length > 0) {
      return options.filter(option => fieldValue.includes(option._id));
    }
    else return null;
  } else
    return options.find(option => option._id === fieldValue);
}

export function Select({
  label,
  withFeedbackLabel = true,
  type = "text",
  customFeedbackLabel,
  children,
  ...props
}) {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  return (
    <>
      {/* {label && <label>Select {label}</label>} */}
      <select
        className={getFieldCSSClasses(touched, error)}
        {...field}
        {...props}
      >
        {children}
      </select>
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          erros={error}
          touched={touched}
          label={label}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
};

export function SearchSelect({ ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const intl = useIntl();
  return (
    <>
      {/* {props.label && <label>Select {props.label}</label>} */}
      <CustomSelect
        {...props}
        value={getSelectValues(props.isMulti, props.options, field.value)}
        onChange={option => {
          if (props.changeFunc)
            props.changeFunc(option);
          if (props.isMulti === true) {
            if (option && option.length > 0) {
              const ids = option.map((o) => { return o._id });
              setFieldValue(field.name, ids);
            } else
              setFieldValue(field.name, null);
          } else {
            setFieldValue(field.name, option._id)
          }
        }}
      />
      <div className="feedback">
        {props.label && (
          <span dangerouslySetInnerHTML={{ __html: intl.formatMessage({id: "FORM.SELECT_FEEDBACK_LABEL"}, {name: props.label}) }}>
          </span>
        )}
      </div>
    </>
  );
};
