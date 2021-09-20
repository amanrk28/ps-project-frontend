import React, { Component } from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import {
  adminOrderActions,
  adminProductActions,
  productActionId,
  orderActionId,
} from './constants';
import './AdminDashboard.scss';

class AdminDashboard extends Component {
  onClickProductAction = id => {
    switch (id) {
      case productActionId.addProduct:
        console.log(id);
        break;
      case productActionId.viewProduct:
        console.log(id);
        break;
      case productActionId.updateProduct:
        console.log(id);
        break;
      default:
        console.log(id);
    }
  };

  onClickOrderAction = id => {
    switch (id) {
      case orderActionId.viewOrders:
        console.log(id);
        break;
      case orderActionId.updateOrderStatus:
        console.log(id);
        break;
      default:
        console.log(id);
    }
  };

  render() {
    return (
      <div className="adminDb-wrapper">
        <AdminHeader />
        <div className="adminDb-body">
          <div className="adminDb-tab">PRODUCTS</div>
          <div className="adminDb-tabitems">
            {adminProductActions.map(item => (
              <div
                key={item.id}
                className="adminDb-actionCard center"
                onClick={() => this.onClickProductAction(item.id)}
              >
                <item.icon fontSize="large" />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <div className="adminDb-tab">ORDERS</div>
          <div className="adminDb-tabitems">
            {adminOrderActions.map(item => (
              <div
                key={item.id}
                className="adminDb-actionCard center"
                onClick={() => this.onClickOrderAction(item.id)}
              >
                <item.icon fontSize="large" />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
