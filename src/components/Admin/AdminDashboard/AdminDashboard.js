import React, { Component } from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import AddIcon from '@mui/icons-material/Add';
import './AdminDashboard.scss';

class AdminDashboard extends Component {
  render() {
    return (
      <div className="adminDb-wrapper">
        <AdminHeader />
        <div className="adminDb-body">
          <div className="adminDb-addProduct center">
            <AddIcon fontSize="large" /> Add Product
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
