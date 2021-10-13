import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Input from 'components/common/Input/Input';
import Filter from 'components/Filter/Filter';
import LOGO_MAIN, { queryStringify, COMPANY_NAME } from 'utils/utils';
import * as actions from 'store/actions/authActions';
import * as productActions from 'store/actions/productActions';
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAccountsTabOpen: false,
      search: '',
      category: 'all',
    };
  }

  componentDidMount = () => {
    const { productActions, router } = this.props;
    let query = {};
    if (router.location.query?.search) {
      query.search = router.location.query.search;
    }
    if (
      router.location.query?.category &&
      router.location.query?.category !== 'all'
    ) {
      query.category = router.location.query.category;
    }
    this.setState({ ...query });
    productActions.getProducts({ query });
  };

  onChangeFilter = e => {
    const { history, router, productActions } = this.props;
    const { value } = e.target;
    const key = e.currentTarget.getAttribute('data-name');
    const query = { ...router.location.query, [key]: value };
    this.setState({ ...this.state, ...query });
    for (const k in query) {
      if (query.hasOwnProperty(k) && !query[k]) delete query[k];
      if (k === 'category' && query[k] === 'all') delete query[k];
    }
    history.push({ search: queryStringify(query) });
    productActions.getProducts({ query });
  };

  onClickLogout = () => {
    this.props.actions.logout();
  };

  toggleAccountTab = () => {
    this.setState({ isAccountsTabOpen: !this.state.isAccountsTabOpen });
  };

  render() {
    const { search, isAccountsTabOpen, category } = this.state;
    const { user, enableSearch, cartCount, productCategories } = this.props;
    return (
      <div className="header">
        <Link to="/">
          <img className="header__logo" src={LOGO_MAIN} alt={COMPANY_NAME} />
        </Link>
        {enableSearch && (
          <div className="search-and-filter center">
            <div className="header-filter">
              <Filter
                filterOptions={productCategories}
                value={category}
                onChange={this.onChangeFilter}
                dataname="category"
              />
            </div>
            <div className="header-search">
              <Input
                dataname="search"
                value={search}
                onChange={this.onChangeFilter}
                placeholder="Shop by Product name"
              />
            </div>
          </div>
        )}

        <div className="header__nav">
          {user.user_id ? (
            <>
              <div
                className="header__option accounts"
                onClick={this.toggleAccountTab}
              >
                <p className="header__user">
                  Hello, <br />
                  <span>{user.first_name}</span>
                </p>
                {isAccountsTabOpen ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </div>
              {isAccountsTabOpen && (
                <div className="tabWrapper">
                  <div className="account">
                    <Link to="/account">Account</Link>
                  </div>
                  <div className="orders">
                    <Link to="/orders">Orders</Link>
                  </div>
                  <div className="logout" onClick={this.onClickLogout}>
                    Logout
                  </div>
                </div>
              )}
              <div className="header__option">
                <Link to="/cart">
                  <div className="cart_logo__wrapper">
                    <ShoppingCartIcon className="header__cartLogo" />
                    <div className="cart__count center">{cartCount}</div>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <div className="header__option header__signin">
              <Link to="/login">
                <AccountCircleIcon className="header__accountLogo" />
                <p className="signinText">Sign In</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router,
  user: state.auth,
  cartCount: state.cart.cart_count,
  productCategories: state.product.product_categories,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  productActions: bindActionCreators(productActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
