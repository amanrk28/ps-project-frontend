import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { LOGO_URL } from 'utils/utils';
import { logout } from 'store/actions/authActions';
import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { auth, cartCount } = useSelector(state => ({
    auth: state.auth,
    cartCount: state.cart.cart_count,
  }));

  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <Link to="/home">
        <img className="header__logo" src={LOGO_URL} alt="MyMSME" />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <div className="header__option">
          <Link to="/checkout">
            <div className="cart_logo__wrapper">
              <ShoppingCartOutlinedIcon className="header__cartLogo" />
              <div className="cart__count center">{cartCount}</div>
            </div>
          </Link>
        </div>
        {auth.user_id && (
          <>
            <div className="header__option">
              <Link to="/orders">
                <span className="header__optionline">Orders</span>
              </Link>
            </div>
            <div className="header__option">
              <div className="adminHeader-logout" onClick={onClickLogout}>
                <LogoutIcon fontSize="large" />
              </div>
            </div>
          </>
        )}

        {!auth.user_id && (
          <div className="header__option">
            <Link to="/login">
              <AccountCircleOutlinedIcon className="header__accountLogo" />
              {/* <span className="header__optionline">Sign In</span> */}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
