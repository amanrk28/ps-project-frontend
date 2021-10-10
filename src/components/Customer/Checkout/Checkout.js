import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './Checkout.scss';

class Checkout extends Component {
  render() {
    return (
      <div className="checkout-wrapper">
        <div className="checkout-header">Checkout</div>
      </div>
    );
  }
}

export default withRouter(Checkout);
