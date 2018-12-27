import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SurveyList from "./surveys/SurveyList";

const Dashboard = ({ auth }) => {
  switch (auth) {
    case null:
      return <div />;

    case false:
      return (
        <div style={{ textAlign: "center" }}>
          <h3>Login to Add Surveys</h3>
        </div>
      );

    default:
      return (
        <div>
          <SurveyList />
          <div className="fixed-action-btn">
            <Link
              to="/surveys/new"
              className="btn-floating btn-large waves-effect waves-light red"
            >
              <i className="material-icons">add</i>
            </Link>
          </div>
        </div>
      );
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);
