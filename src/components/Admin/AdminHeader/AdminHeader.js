import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from 'utils/utils';
import './AdminHeader.scss';

class AdminHeader extends Component {
  render() {
    return (
      <div className="adminHeader-wrapper">
        <Link to="/admin">
          <div className="logo-wrapper">
            <img src={LOGO_URL} alt="" />
          </div>
        </Link>
      </div>
    );
  }
}

export default AdminHeader;
