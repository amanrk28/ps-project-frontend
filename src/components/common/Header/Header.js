import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { debounce } from 'lodash';
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
    const { productActions, query } = this.props;
    let queryObj = {};
    if (query?.search) {
      queryObj.search = query.search;
    }
    if (query?.category && query?.category !== 'all') {
      queryObj.category = query.category;
    }
    this.setState({ ...queryObj });
    productActions.getProducts({ query: queryObj });
  };

  getFilteredResult = queryObj => {
    const { history, productActions } = this.props;
    for (const k in queryObj) {
      if (queryObj.hasOwnProperty(k) && !queryObj[k]) delete queryObj[k];
      if (k === 'category' && queryObj[k] === 'all') delete queryObj[k];
    }
    history.push({ search: queryStringify(queryObj) });
    productActions.getProducts({ query: queryObj });
  };

  debounceFn = debounce(queryObj => this.getFilteredResult(queryObj), 400);

  onChangeFilter = e => {
    const { query } = this.props;
    let { value } = e.target;
    const key = e.currentTarget.getAttribute('data-name');
    const queryObj = { ...query, [key]: value };
    this.setState({ ...this.state, ...queryObj });
    if (key === 'search') this.debounceFn(queryObj);
    else this.getFilteredResult(queryObj);
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
  query: state.router.location.query,
  user: state.auth,
  cartCount: state.cart.cart_count,
  productCategories: state.product.product_categories,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  productActions: bindActionCreators(productActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
