import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as actions from 'store/actions/cartActions';
import * as productActions from 'store/actions/productActions';
import Button, { ButtonTypes } from 'components/common/Button/Button';
import PlusMinusBtn from 'components/common/PlusMinusBtn/PlusMinusBtn';
import './CartMobile.scss';

class CartMobile extends Component {
  componentDidMount = () => {
    const { actions, productActions, cartCount } = this.props;
    if (cartCount === 0) {
      actions.getCartItems();
      productActions.getProducts();
    }
  };

  onClickBack = () => {
    this.props.history.push('/');
  };

  onUpdateCartCount = (quantity, id) => {
    const { actions } = this.props;
    actions.updateCartItem({ product_id: id, quantity });
  };

  onClickDeleteCartItem = id => {
    const { actions } = this.props;
    actions.updateCartItem({ product_id: id, quantity: 0 });
  };

  onClickProceed = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const { productList, totalAmount, cartItems, cartCount } = this.props;
    const renderCartItems = [];
    if (productList && cartItems) {
      productList.forEach(x => {
        for (const cartItem of cartItems) {
          if (x.id === cartItem.product_id) {
            renderCartItems.push({ ...x, quantity: cartItem.quantity });
            break;
          }
        }
      });
    }

    return (
      <div className="cartMobile-wrapper">
        <div className="cartMobile-header-wrapper center">
          <div className="goBack center" onClick={this.onClickBack}>
            <ArrowBackIcon />
          </div>
          <div className="cartMobile-header">Shopping Cart</div>
        </div>
        <div className="cartMobile-secondary-header">
          <h2 className="totalAmount">
            Sub Total: <span>&#8377;{totalAmount}</span>
          </h2>
          <Button
            text="Proceed to Buy"
            onClick={this.onClickProceed}
            type={cartCount > 0 ? ButtonTypes.Primary : ButtonTypes.Disabled}
          />
        </div>
        <ul className="mobile-table-wrapper">
          {renderCartItems.map(cartItem => (
            <li key={cartItem.id}>
              <div className="image">
                <img src={cartItem.image} alt={cartItem.name} />
                <div className="quantityControl">
                  <PlusMinusBtn
                    count={cartItem.quantity}
                    updateCartCount={quantity =>
                      this.onUpdateCartCount(quantity, cartItem.id)
                    }
                  />
                </div>
              </div>
              <div className="productDetails">
                <p>{cartItem.name}</p>
                <p className="description">{cartItem.description}</p>
                <p>&#8377;&nbsp;{cartItem.price}</p>
              </div>
            </li>
          ))}
        </ul>
        {cartCount > 0 && (
          <Button text="Proceed to Buy" onClick={this.onClickProceed} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cart_items,
  totalAmount: state.cart.total_amount,
  productList: state.product.products,
  cartCount: state.cart.cart_count,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  productActions: bindActionCreators(productActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartMobile);
