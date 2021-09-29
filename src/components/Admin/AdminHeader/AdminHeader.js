import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import LOGO_MAIN from 'utils/utils';
import { logout } from 'store/actions/authActions';
import { COMPANY_NAME } from 'utils/utils';
import './AdminHeader.scss';

const AdminHeader = () => {
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="adminHeader-wrapper">
      <Link to="/admin">
        <div className="logo-wrapper">
          <img src={LOGO_MAIN} alt={COMPANY_NAME} />
        </div>
      </Link>
      <div className="adminHeader-logout" onClick={onClickLogout}>
        <LogoutIcon fontSize="large" />
        <p className="logoutText">Logout</p>
      </div>
    </div>
  );
};

export default AdminHeader;
