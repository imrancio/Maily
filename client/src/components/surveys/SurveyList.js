import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys, deleteSurvey } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    // fetch list of surveys for user
    this.props.fetchSurveys();
    // refresh list every 30s (sendGrid API replies periodically)
    setInterval(this.props.fetchSurveys, 30 * 1000);
  }

  renderLastUpdated(lastResponded) {
    if (lastResponded) {
      return (
        <div>
          <br />
          <p className="right">
            Last Response: {new Date(lastResponded).toLocaleDateString()}
          </p>
        </div>
      );
    }
  }

  renderSurveys() {
    if (this.props.surveys) {
      if (this.props.surveys.length === 0) {
        return (
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">
                Add a survey to see some analytics
              </span>
            </div>
          </div>
        );
      }
      return this.props.surveys.map(survey => {
        return (
          <div className="card blue-grey darken-1" key={survey._id}>
            <div className="card-content white-text">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
              {this.renderLastUpdated(survey.lastResponded)}
            </div>
            <div className="card-action">
              <a>Yes: {survey.yes}</a>
              <a>No: {survey.no}</a>
              <button
                onClick={() => this.props.deleteSurvey(survey._id)}
                className="waves-effect waves-light orange darken-2 btn-small"
              >
                <i className="material-icons">delete</i>
              </button>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys, deleteSurvey }
)(SurveyList);
