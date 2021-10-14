import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LOGO_MAIN, { COMPANY_NAME } from 'utils/utils';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Input from 'components/common/Input/Input';
import Filter from 'components/Filter/Filter';
import './Header.scss';
import { HEADER_ITEMS } from './constants';

const DesktopHeader = ({
  enableSearch,
  productCategories,
  onChangeFilter,
  category,
  search,
  isLoggedIn,
  name,
  onClickLogout,
  cartCount,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="desktopHeader-wrapper">
      <Link to="/">
        <img className="header-logo" src={LOGO_MAIN} alt={COMPANY_NAME} />
      </Link>
      {enableSearch && (
        <div className="search-and-filter center">
          <div className="header-filter">
            <Filter
              filterOptions={productCategories}
              value={category}
              onChange={onChangeFilter}
              dataname="category"
            />
          </div>
          <div className="header-search">
            <Input
              dataname="search"
              value={search}
              onChange={onChangeFilter}
              placeholder="Shop by Product name"
            />
          </div>
        </div>
      )}

      <div className="header__nav">
        {isLoggedIn ? (
          <>
            <div className="header__option accounts" onClick={toggleDropdown}>
              <p className="header__user">
                Hello, <br />
                <span>{name}</span>
              </p>
              <ArrowDropDownIcon
                className={`arrowIcon ${isDropdownOpen ? 'arrowDownIcon' : ''}`}
              />
            </div>
            {isDropdownOpen && (
              <div className="tabWrapper">
                {HEADER_ITEMS.map(item => {
                  if (item.dataname !== 'cart')
                    return (
                      <div className="account" key={item.dataname}>
                        <Link to={item.url} onClick={toggleDropdown}>
                          {item.name}
                        </Link>
                      </div>
                    );
                })}
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
        ) : (
          <div className="header__option header__signin">
            <Link to="/login">
              <AccountCircleIcon className="header__accountLogo" />
              <p className="signinText">Sign In</p>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DesktopHeader;
