import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  IconButton,
  ListItem,
  Divider,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import LOGO_MAIN, { COMPANY_NAME } from 'utils/utils';
import { HEADER_ITEMS, drawerStyle, iconStyle } from './constants';
import './Header.scss';

interface MobileHeaderProps {
  isLoggedIn: boolean;
  onClickLogout: () => void;
}

const MobileHeader = ({ isLoggedIn, onClickLogout }: MobileHeaderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="mobileHeader-wrapper">
        <Link to="/">
          <img className="header-logo" src={LOGO_MAIN} alt={COMPANY_NAME} />
        </Link>
        {isLoggedIn ? (
          <MenuIcon onClick={toggleDrawer} />
        ) : (
          <div className="header__signin">
            <Link to="/login">
              <AccountCircleIcon />
            </Link>
          </div>
        )}
      </div>
      <Drawer
        sx={drawerStyle}
        variant="temporary"
        open={isDrawerOpen}
        anchor="right"
        onClose={toggleDrawer}
      >
        <List
          sx={{
            ['&.MuiList-root a']: {
              color: '#fff',
              fontWeight: '600',
              fontSize: 20,
            },
          }}
        >
          <ListItem>Hello Anirudh</ListItem>
          <Divider />
          {HEADER_ITEMS.map(item => (
            <Link key={item.name} to={item.url} onClick={toggleDrawer}>
              <ListItemButton
                sx={{
                  [`&.Mui-selected`]: {
                    background: 'linear-gradient(-45deg, #a4ce38ee, #80ae38)',
                  },
                }}
              >
                {item.name}
              </ListItemButton>
            </Link>
          ))}
        </List>
        <IconButton sx={iconStyle} onClick={onClickLogout}>
          <LogoutIcon fontSize="large" />
        </IconButton>
      </Drawer>
    </>
  );
};

export default MobileHeader;
