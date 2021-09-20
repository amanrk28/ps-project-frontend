import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { user } = this.props;
    return (
      <div className="adminDb-wrapper">
        <AdminHeader />
        <div className="adminDb-body">
          <div className="adminDb-user-welcome">
            Welcome back,{' '}
            <span>{user.full_name || user.first_name || user.last_name}</span>
          </div>
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

const mapStateToProps = state => ({
  user: state.auth,
});

export default connect(mapStateToProps, null)(AdminDashboard);
