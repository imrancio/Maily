// SurveyFormReview shows form inputs for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label className="white-text">{label}</label>
        <div className="white-text">{formValues[name]}</div>
        <p />
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div className="card-panel teal">
        <div className="white-text">{reviewFields}</div>
      </div>
      <p />
      <button
        className="waves-effect waves-light yellow darken-4 btn white-text"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="waves-effect waves-light green white-text btn-flat right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
