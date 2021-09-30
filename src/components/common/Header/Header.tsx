import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LOGO_MAIN from 'utils/utils';
import { logout } from 'store/actions/authActions';
import { COMPANY_NAME } from 'utils/utils';
import './Header.scss';
import { RootState } from 'store/reducers/rootState';

interface HeaderProps {
  enableSearch: boolean;
}

const Header = ({ enableSearch = false }: HeaderProps) => {
  const [isAccountsTabOpen, setIsAccountsTabOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, cartCount } = useSelector((state: RootState) => ({
    user: state.auth,
    cartCount: state.cart.cart_count,
  }));

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
          <input className="header__searchInput" type="text" />
          <SearchIcon className="header__searchIcon" />
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
          </>
        )}
        <div className="header__option">
          <Link to="/checkout">
            <div className="cart_logo__wrapper">
              <ShoppingCartOutlinedIcon className="header__cartLogo" />
              <div className="cart__count center">{cartCount}</div>
            </div>
          </Link>
        </div>

        {!user.user_id && (
          <div className="header__option header__signin">
            <Link to="/login">
              <AccountCircleOutlinedIcon className="header__accountLogo" />
              <p className="signinText">Sign In</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
