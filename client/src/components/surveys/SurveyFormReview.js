// SurveyFormReview shows form inputs for review
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";
import * as actions from "../../actions";

class SurveyFormReview extends Component {
  // Ensure submitSurvey only called once
  submitOnce() {
    if (!this.sendButtonClicked) {
      // credit check
      if (this.props.credits < 1) {
        this.error.style = { display: "block" };
      } else {
        this.props.submitSurvey(this.props.formValues, this.props.history);
        this.sendButtonClicked = true;
      }
    }
  }
  // Submit form with enter keypress
  _handleKeyPress = event => {
    if (event.key === "Enter") {
      this.submitOnce();
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyPress, false);
    this.sendButtonClicked = false;
    this.error = document.querySelector("#error");
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyPress, false);
  }
  // render fields
  reviewFields() {
    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name}>
          <label className="white-text">{label}</label>
          <div className="white-text">{this.props.formValues[name]}</div>
          <p />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h5>Please confirm your entries</h5>
        <div className="card-panel teal">
          <div className="white-text">{this.reviewFields()}</div>
        </div>
        <p />
        <button
          className="waves-effect waves-light yellow darken-4 btn white-text"
          onClick={this.props.onCancel}
        >
          Back
        </button>
        <button
          className="waves-effect waves-light green white-text btn-flat right"
          onClick={() => this.submitOnce()}
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
        <div id="error" className="red-text center" style={{ display: "none" }}>
          Not enough credits!
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
    credits: state.auth.credits
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
