import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Product from '../Product/Product';
import * as cartActions from 'store/actions/cartActions';
import './Home.scss';

class Home extends Component {
  componentDidUpdate = prevProps => {
    const { auth, cartActions } = this.props;
    if (prevProps.auth.user_id !== auth.user_id && auth.user_id) {
      cartActions.getCartItems();
    }
  };
  render() {
    const { productList, cartItemIds, cartItems, auth, cartActions } =
      this.props;
    return (
      <div className="home">
        {productList.length > 0 ? (
          <div className="home__row">
            {productList.map(product => (
              <Product
                key={product.id}
                id={product.id}
                product={product}
                auth={auth}
                cartItems={cartItems}
                cartItemIds={cartItemIds}
                actions={{
                  addCartItem: cartActions.addCartItem,
                  updateCartItem: cartActions.updateCartItem,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="home__empty_products center">
            <p>No Products available right now!</p>
            <p>Please Try again later</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  productList: state.product.products,
  auth: state.auth,
  cartItemIds: state.cart.cart_item_ids,
  cartItems: state.cart.cart_items,
});

const mapDispatchToProps = dispatch => ({
  cartActions: bindActionCreators(cartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
