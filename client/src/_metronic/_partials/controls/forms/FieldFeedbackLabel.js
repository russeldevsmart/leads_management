import React from "react";
import { useIntl } from "react-intl";

const inputLabel = ({ label, touched, error, customFeedbackLabel, intl }) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  if (touched && !error && label) {
    return <div className="valid-feedback">{intl.formatMessage({id: "FORM.INPUT_FEEDBACK_CORRECT"}, { name: label })}</div>;
  }

  return (
    <div className="feedback">
      {customFeedbackLabel && <>{customFeedbackLabel}</>}
      {!customFeedbackLabel && (
        <span dangerouslySetInnerHTML={{ __html: intl.formatMessage({id: "FORM.INPUT_FEEDBACK_LABEL"}, {name: label}) }}>
        </span>
      )}
    </div>
  );
};

const selectLabel = ({ label, touched, error, customFeedbackLabel, intl }) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  return (
    <div className="feedback">
      {customFeedbackLabel && <>{customFeedbackLabel}</>}
      {!customFeedbackLabel && label && (
        <span dangerouslySetInnerHTML={{ __html: intl.formatMessage({id: "FORM.SELECT_FEEDBACK_LABEL"}, {name: label}) }}>
        </span>
      )}
    </div>
  );
};

export function FieldFeedbackLabel({
  label,
  touched,
  error,
  type,
  customFeedbackLabel
}) {
  const intl = useIntl();
  switch (type) {
    case "text":
      return inputLabel({ label, touched, error, customFeedbackLabel, intl });
    case "tel":
      return inputLabel({ label, touched, error, customFeedbackLabel, intl });
    case "number":
      return inputLabel({ label, touched, error, customFeedbackLabel, intl });
    case "textarea":
      return inputLabel({ label, touched, error, customFeedbackLabel, intl });
    case "email":
      return inputLabel({ label, touched, error, customFeedbackLabel, intl });
    case "password":
      return inputLabel({ label, touched, error, customFeedbackLabel, intl });
    default:
      return selectLabel({ label, touched, error, customFeedbackLabel, intl });
  }
}
