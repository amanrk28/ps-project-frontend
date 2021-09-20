import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.scss';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { LOGO_URL } from 'utils/utils';

const Header = props => {
  return (
    <div className="header">
      <Link to="/home">
        <img className="header__logo" src={LOGO_URL} alt="MYMSME" />
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
              <div className="cart__count center">{props.cartCount}</div>
            </div>
          </Link>
        </div>
        {props.auth.user_id && (
          <div className="header__option">
            <Link to="/orders">
              <span className="header__optionline">Orders</span>
            </Link>
          </div>
        )}

        {!props.auth.user_id && (
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

const mapStateToProps = state => ({
  auth: state.auth,
  cartCount: state.cart.cart_count,
});

export default connect(mapStateToProps, null)(Header);
