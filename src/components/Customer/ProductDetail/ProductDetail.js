import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlusMinusBtn from 'components/common/PlusMinusBtn/PlusMinusBtn';
import Button from 'components/common/Button/Button';
import { getProductItem } from 'store/actions/productActions';
import * as cartActions from 'store/actions/cartActions';
import './ProductDetail.scss';
import { bindActionCreators } from 'redux';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: null,
        category: '',
        image: '',
        description: '',
        is_available: false,
        name: '',
        price: 0,
        stock: 0,
      },
    };
  }

  componentDidMount = () => {
    const { dispatchGetProductItem, match, auth, cartActions, cartItems } =
      this.props;
    if (cartItems.length === 0 && auth.user_id && !auth.isCartEmpty)
      cartActions.getCartItems();
    const id = parseInt(match.params.id, 10);
    if (id)
      dispatchGetProductItem({
        id,
        onSuccess: data => this.setState({ product: data }),
        onFailure: () => console.log('Product Not Found'),
      });
  };

  componentDidUpdate = prevProps => {
    const { auth, cartActions } = this.props;
    if (
      prevProps.auth.user_id !== auth.user_id &&
      auth.user_id &&
      !auth.isCartEmpty
    ) {
      cartActions.getCartItems();
    }
  };

  onClickAddToCart = () => {
    const { cartActions, history, auth } = this.props;
    const {
      product: { id },
    } = this.state;
    if (!auth.user_id) {
      NotifyMe('warning', 'Please Login to continue shopping');
      history.push({ pathname: '/login', hash: 'addtocart', state: id });
    } else cartActions.addCartItem(id);
  };

  updateCartCount = quantity => {
    const { cartActions } = this.props;
    const { product } = this.state;
    if (quantity <= product.stock)
      cartActions.updateCartItem({ product_id: product.id, quantity });
  };

  getProductCount = () => {
    const { cartItems } = this.props;
    const { product } = this.state;
    if (cartItems && cartItems.length > 0) {
      const item = cartItems.find(x => x.product_id === product.id);
      if (item) return item.quantity;
    }
  };

  getCategoryFromId = categoryName => {
    const { productCategories } = this.props;
    const category = productCategories.find(x => x.id === categoryName);
    if (category) return category.name;
    return categoryName;
  };

  onClickBack = () => {
    this.props.history.push('/');
  };

  render() {
    const { product } = this.state;
    const { cartItemIds } = this.props;
    return (
      <div className="productDetail-wrapper">
        <div className="productDetail-header-wrapper center">
          <div className="goBack center" onClick={this.onClickBack}>
            <ArrowBackIcon />
          </div>
        </div>
        <div className="productDetail-body">
          <div className="image-wrapper">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="details-wrapper">
            <div className="name">{product.name}</div>
            <div className="category">
              {this.getCategoryFromId(product.category)}
            </div>
            <div className="price">&#8377;{product.price}</div>
            <div className="stock">
              {product.stock > 5 ? (
                <p className="in-stock">In Stock</p>
              ) : product.stock === 0 ? (
                <p className="out-of-stock">Out of Stock</p>
              ) : (
                <p className="few-left">Only {product.stock} left in Stock</p>
              )}
            </div>
            <div className="btn-container">
              {cartItemIds && cartItemIds.includes(product.id) ? (
                <PlusMinusBtn
                  count={this.getProductCount()}
                  updateCartCount={this.updateCartCount}
                />
              ) : (
                <Button text="Add to Cart" onClick={this.onClickAddToCart} />
              )}
            </div>
            <div className="description">{product.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  productCategories: state.product.product_categories,
  cartItemIds: state.cart.cart_item_ids,
  cartItems: state.cart.cart_items,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  cartActions: bindActionCreators(cartActions, dispatch),
  dispatchGetProductItem: props => dispatch(getProductItem(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
