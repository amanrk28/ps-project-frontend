import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { LOGO_URL } from 'utils/utils';

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
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
              <ShoppingBasketIcon className="header__cartLogo" />
              <div className="cart__count center">0</div>
            </div>
          </Link>
        </div>

        <div className="header__option">
          <span className="header__optionline">
            Returns
            <br />
            Orders
          </span>
        </div>

        <div className="header__option">
          <PersonOutlineIcon className="header__personLogo" />
          <span className="header__optionline">Sign In</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
