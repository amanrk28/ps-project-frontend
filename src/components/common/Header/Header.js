import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Input from 'components/common/Input/Input';
import LOGO_MAIN, { queryStringify, COMPANY_NAME } from 'utils/utils';
import { logout } from 'store/actions/authActions';
import { getProducts } from 'store/actions/productActions';
import './Header.scss';

const Header = ({ enableSearch = false, history }) => {
  const [isAccountsTabOpen, setIsAccountsTabOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { router, user, cartCount } = useSelector(state => ({
    router: state.router,
    user: state.auth,
    cartCount: state.cart.cart_count,
  }));

  useEffect(() => {
    if (router.location?.query?.search) {
      const query = { search: router?.location.query.search };
      setSearch(query.search);
      dispatch(getProducts({ query }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFilter = e => {
    const { value } = e.target;
    const query = { search: value };
    setSearch(query.search);
    if (query.hasOwnProperty('search') && !query.search) delete query.search;
    history.push({ search: queryStringify(query) });
    dispatch(getProducts({ query }));
  };

  const onClickLogout = () => {
    dispatch(logout());
  };

  const toggleAccountTab = () => {
    setIsAccountsTabOpen(!isAccountsTabOpen);
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={LOGO_MAIN} alt={COMPANY_NAME} />
      </Link>
      {enableSearch && (
        <div className="header__search">
          <Input
            dataname="search"
            value={search}
            onChange={onChangeFilter}
            placeholder="Search by Product name"
          />
        </div>
      )}

      <div className="header__nav">
        {user.user_id && (
          <>
            <div className="header__option accounts" onClick={toggleAccountTab}>
              <p className="header__user">
                Hello, <br />
                <span>{user.first_name}</span>
              </p>
              {isAccountsTabOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </div>
            {isAccountsTabOpen && (
              <div className="tabWrapper">
                <div className="account">
                  <Link to="/account">Account</Link>
                </div>
                <div className="orders">
                  <Link to="/orders">Orders</Link>
                </div>
                <div className="logout" onClick={onClickLogout}>
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
        )}

        {!user.user_id && (
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
};

export default withRouter(Header);
