import React from "react";
import { connect } from "react-redux";
import Payments from "./Payments";

const HeaderContent = props => {
  switch (props.auth) {
    case null:
      return;
    case false:
      return (
        <li>
          <a href="/auth/google">Login with Google</a>
        </li>
      );
    default:
      return [
        <li key="1">
          <Payments />
        </li>,
        <li key="2" style={{ margin: "0 10px" }}>
          Credits: {props.auth.credits}
        </li>,
        <li key="3">
          <a href="/api/logout">Logout</a>
        </li>
      ];
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(HeaderContent);
