// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { connect } from "react-redux";
import Landing from "../Landing";

class SurveyNew extends Component {
  // babel will initialise state in constructor
  state = { showFormReview: false };

  renderContent() {
    switch (this.props.auth) {
      case null:
        return <div />;
      case false:
        return <Landing />;
      default:
        if (this.state.showFormReview) {
          return (
            <SurveyFormReview
              onCancel={() => this.setState({ showFormReview: false })}
            />
          );
        }

        return (
          <SurveyForm
            onSurveySubmit={() => this.setState({ showFormReview: true })}
          />
        );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default reduxForm({
  form: "surveyForm"
  // reduxForm auto destroys surveyForm state
  // when SurveyNew unmounts
})(connect(mapStateToProps)(SurveyNew));
