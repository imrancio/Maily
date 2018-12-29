// SurveyForm shows a form to add user input
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ name, label, placeholder }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          name={name}
          label={label}
          placeholder={placeholder}
        />
      );
    });
  }

  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link
            to="/surveys"
            className="red waves-effect waves-light btn white-text"
          >
            Cancel
          </Link>
          <button type="submit" className="waves-effect waves-light right btn">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  // object keys correspond to Field names
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  // check if FIELD names exist in values (non-empty input)
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  // errors will be added to Field component as prop
  return errors;
}

// Provides handleSubmit prop to handle form submit
export default reduxForm({
  validate,
  form: "surveyForm",
  // save state when unmounting SurveyForm
  destroyOnUnmount: false
})(SurveyForm);
