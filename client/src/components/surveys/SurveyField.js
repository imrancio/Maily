// SurveyField will render a single label / text input
import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  // attach all props that reduxForm added to input
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      {touched && error}
    </div>
  );
};
