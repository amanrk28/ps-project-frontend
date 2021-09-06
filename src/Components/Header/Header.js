import React from 'react';
import './Header.scss'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Link } from 'react-router-dom';

function Header () {
    return (
        <div className="header">
            <Link to="/">
                <img className="header__logo" src="https://i.ibb.co/0Bm2xpD/logomain2.png"/>
            </Link>
            <div className="header__search">
                <input className="header__searchInput" type="text"/>
                <SearchIcon className="header__searchIcon"/>
            </div>

            <div className="header__nav">
                    <div className="header__option">
                        <Link to="/checkout">
                            <ShoppingBasketIcon className="header__cartLogo"/>
                        </Link> 
                    </div>

                <div className="header__option">
                    <span className="header__optionline">Returns<br/>Orders</span>
                </div>

                <div className="header__option">
                    <PersonOutlineIcon className="header__personLogo"/>
                    <span className="header__optionline">Sign In</span>
                </div>
            </div>
        </div>
    )
}

export default Header
