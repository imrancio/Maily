import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <img
            src="favicon.png"
            alt="logo"
            style={{ padding: "10px 5px", width: "4%" }}
            className="left"
          />
          <a href="#" className="brand-logo">
            Maily
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="sass.html">Login with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
