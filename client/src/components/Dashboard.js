import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SurveyList from "./surveys/SurveyList";
import Landing from "./Landing";

const Dashboard = ({ auth }) => {
  switch (auth) {
    case null:
      return <div />;

    case false:
      return <Landing />;

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
