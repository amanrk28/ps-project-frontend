import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProductDetail.scss';

class ProductDetail extends Component {
  render() {
    // const { product } = this.props;
    return (
      <div className="productDetail-wrapper">
        <div className="productDetail-header">Product Details</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let id = -1;
  let product = {};
  if (state.router.location.pathname) {
    id = state.router.location.pathname.slice(-1);
    id = parseInt(id, 10);
    if (id > -1) {
      product = state.product.products.find(x => x.id === id);
    }
  }
  return { product };
};

export default connect(mapStateToProps, null)(ProductDetail);
