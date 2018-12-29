// SurveyField will render a single label / text input
import React from "react";

export default ({ input, label, placeholder, meta: { error, touched } }) => {
  // attach all props that reduxForm added to input
  return (
    <div>
      <label>{label}</label>
      <input
        {...input}
        placeholder={placeholder}
        style={{ marginBottom: "5px" }}
      />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
