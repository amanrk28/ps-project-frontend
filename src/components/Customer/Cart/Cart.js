import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as actions from 'store/actions/cartActions';
import * as productActions from 'store/actions/productActions';
import PlusMinusBtn from 'components/common/PlusMinusBtn/PlusMinusBtn';
import Button from 'components/common/Button/Button';
import ListTable from 'components/common/ListTable/ListTable';
import './Cart.scss';

const CART_TABLE_HEADERS = [
  { name: '#', dataname: 'id' },
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

  renderListItem = ({ idx, item, dataItem }) => {
    return (
      <div className={item.dataname} key={item.dataname}>
        {item.dataname === 'id' && idx + 1}
        {item.dataname === 'image' && (
          <img src={dataItem.image} alt={dataItem.name} />
        )}
        {item.dataname === 'amount' && (
          <div>
            &#8377;
            {dataItem.quantity * dataItem.price}
          </div>
        )}
        {item.dataname === 'quantity' && (
          <PlusMinusBtn
            count={dataItem[item.dataname]}
            updateCartCount={quantity =>
              this.onUpdateCartCount(quantity, dataItem.id)
            }
          />
        )}
        {['name', 'price'].includes(item.dataname) && (
          <div>
            {item.dataname === 'price' && <>&#8377;</>}
            {dataItem[item.dataname]}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { cartItems, productList, totalAmount, cartCount } = this.props;
    const cartItemsList = [];
    if (productList && cartItems) {
      productList.forEach(x => {
        for (const cartItem of cartItems) {
          if (x.id === cartItem.product_id) {
            cartItemsList.push({ ...x, quantity: cartItem.quantity });
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
          <Button
            text="Proceed to Buy"
            onClick={this.onClickProceed}
            type={cartCount > 0 ? 'primary' : 'disabled'}
          />
        </div>
        <ListTable
          headers={CART_TABLE_HEADERS}
          dataList={cartItemsList}
          tableFor="Cart"
          customTableWrapper="customTableWrapper"
          renderListItem={this.renderListItem}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
