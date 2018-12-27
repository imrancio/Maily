import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

class Header extends Component {
  componentDidMount() {
    const elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, { edge: "left", inDuration: 250 });
  }

  renderContent() {
    switch (this.props.auth) {
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
            Credits: {this.props.auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper light-blue darken-1">
            <Link
              to={this.props.auth ? "/surveys" : "/"}
              className="brand-logo"
            >
              <i
                className="large material-icons"
                style={{ fontSize: "4rem", margin: "0 6px" }}
              >
                mail_outline
              </i>
              Maily
            </Link>
            <a href="/" data-target="mobile" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile" style={{ textAlign: "center" }}>
          {this.renderContent()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
