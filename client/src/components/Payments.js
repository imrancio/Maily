import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Maily"
        description="$5 for 5 email credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        {/* child element styles checkout button */}
        <a className="btn">
          Add Credits<i className="material-icons right">shopping_cart</i>
        </a>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
