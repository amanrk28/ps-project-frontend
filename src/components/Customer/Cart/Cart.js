import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as actions from 'store/actions/cartActions';
import * as productActions from 'store/actions/productActions';
import PlusMinusBtn from 'components/common/PlusMinusBtn/PlusMinusBtn';
import Button from 'components/common/Button/Button';
import './Cart.scss';

const CART_TABLE_HEADERS = [
  { name: 'Image', dataname: 'image' },
  { name: 'Name', dataname: 'name' },
  { name: 'Price/unit', dataname: 'price' },
  { name: 'Quantity', dataname: 'quantity' },
  { name: 'Amount', dataname: 'amount' },
];

class Cart extends Component {
  componentDidMount = () => {
    const { actions, productActions } = this.props;
    actions.getCartItems();
    productActions.getProducts();
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
    const { cartItems, productList, totalAmount } = this.props;
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
      <div className="cart-wrapper">
        <div className="cart-header-wrapper center">
          <div className="goBack center" onClick={this.onClickBack}>
            <ArrowBackIcon />
          </div>
          <div className="cart-header">Shopping Cart</div>
        </div>
        <div className="cart-secondary-header">
          <h2 className="totalAmount">
            Sub Total: <span>&#8377;{totalAmount}</span>
          </h2>
          <Button text="Proceed to Buy" onClick={this.onClickProceed} />
        </div>
        <ul className="table-wrapper">
          <li>
            {CART_TABLE_HEADERS.map(item => (
              <div
                className={`tableHeader ${item.dataname}`}
                key={item.dataname}
              >
                {item.name}
              </div>
            ))}
          </li>
          {renderCartItems.map(cartItem => (
            <li key={cartItem.id}>
              {CART_TABLE_HEADERS.map(item => (
                <div className={item.dataname} key={item.dataname}>
                  {item.dataname === 'image' && (
                    <img src={cartItem.image} alt={cartItem.name} />
                  )}
                  {item.dataname === 'amount' && (
                    <div>
                      &#8377;
                      {cartItem.quantity * cartItem.price}
                    </div>
                  )}
                  {item.dataname === 'quantity' && (
                    <PlusMinusBtn
                      count={cartItem[item.dataname]}
                      updateCartCount={quantity =>
                        this.onUpdateCartCount(quantity, cartItem.id)
                      }
                    />
                  )}
                  {['name', 'price'].includes(item.dataname) && (
                    <div>
                      {item.dataname === 'price' && <>&#8377;</>}
                      {cartItem[item.dataname]}
                    </div>
                  )}
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cart_items,
  totalAmount: state.cart.total_amount,
  productList: state.product.products,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  productActions: bindActionCreators(productActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
