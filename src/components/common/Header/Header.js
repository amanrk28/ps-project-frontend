import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { debounce } from 'lodash';
import { isMobile } from 'react-device-detect';
import { queryStringify } from 'utils/utils';
import { logout } from 'store/actions/authActions';
import { getProducts } from 'store/actions/productActions';
import Loading from '../Loading/Loading';
import './Header.scss';

const MobileHeader = lazy(() => import('./MobileHeader'));
const DesktopHeader = lazy(() => import('./DesktopHeader'));

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      category: 'all',
    };
  }

  componentDidMount = () => {
    const { getProducts, query } = this.props;
    let queryObj = {};
    if (query?.search) {
      queryObj.search = query.search;
    }
    if (query?.category && query?.category !== 'all') {
      queryObj.category = query.category;
    }
    this.setState({ ...queryObj });
    getProducts({ query: queryObj });
  };

  getFilteredResult = queryObj => {
    const { history, getProducts } = this.props;
    for (const k in queryObj) {
      if (queryObj.hasOwnProperty(k) && !queryObj[k]) delete queryObj[k];
      if (k === 'category' && queryObj[k] === 'all') delete queryObj[k];
    }
    history.push({ search: queryStringify(queryObj) });
    getProducts({ query: queryObj });
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
    this.setState({ isAccountsTabOpen: false });
    this.props.logout();
  };

  render() {
    const { search, category } = this.state;
    const { user, enableSearch, cartCount, productCategories } = this.props;
    return (
      <Suspense fallback={<Loading />}>
        {isMobile ? (
          <MobileHeader
            isLoggedIn={Boolean(user.user_id)}
            onClickLogout={this.onClickLogout}
            name={user.first_name || ''}
          />
        ) : (
          <DesktopHeader
            isLoggedIn={Boolean(user.user_id)}
            enableSearch={enableSearch}
            onChangeFilter={this.onChangeFilter}
            category={category}
            search={search}
            productCategories={productCategories}
            isLoggedIn={user.user_id}
            name={user.first_name || ''}
            onClickLogout={this.onClickLogout}
            cartCount={cartCount}
          />
        )}
      </Suspense>
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
  logout: () => dispatch(logout()),
  getProducts: props => dispatch(getProducts(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
