import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const renderDashboardButton = auth => {
  if (auth) {
    return (
      <div>
        <br />
        <Link
          to="/surveys"
          className="red waves-effect waves-light btn"
          style={{ textAlign: "center" }}
        >
          Dashboard <i className="material-icons right">dashboard</i>
        </Link>
      </div>
    );
  }
};

const Landing = ({ auth }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome to Maily{auth ? ", " + auth.firstName : ""}!</h2>
      Collect feedback from your users
      {renderDashboardButton(auth)}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Landing);
