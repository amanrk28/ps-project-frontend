import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PlusMinusBtn from 'components/common/PlusMinusBtn/PlusMinusBtn';
import Button from 'components/common/Button/Button';
import { NotifyMe } from 'components/common/NotifyMe/NotifyMe';
import './Product.scss';

class Product extends Component {
  onClickAddToCart = () => {
    const { actions, id, history, auth } = this.props;
    if (!auth.user_id) {
      NotifyMe('warning', 'Please Login to continue shopping');
      history.push({ pathname: '/login', hash: 'addtocart', state: id });
    } else actions.addCartItem(id);
  };

  getProductCount = () => {
    const { id, cartItems } = this.props;
    if (cartItems && cartItems.length > 0) {
      const item = cartItems.find(x => x.product_id === id);
      if (item) return item.quantity;
    }
  };

  updateCartCount = quantity => {
    const { actions, id } = this.props;
    actions.updateCartItem({ product_id: id, quantity });
  };

  render() {
    const {
      product: { id, image, name, price },
      cartItemIds,
    } = this.props;

    return (
      <div className="product">
        <div className="product-image__container">
          <img src={image} alt={name} />
        </div>
        <div className="product__info">
          <p className="product__title">{name}</p>
          <p className="product__price">&#8377; {price}</p>
        </div>
        <div className="center">
          {cartItemIds && cartItemIds.includes(id) ? (
            <PlusMinusBtn
              count={this.getProductCount()}
              updateCartCount={this.updateCartCount}
            />
          ) : (
            <Button text="Add to Cart" onClick={this.onClickAddToCart} />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
