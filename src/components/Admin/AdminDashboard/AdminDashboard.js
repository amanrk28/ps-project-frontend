import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  adminOrderActions,
  adminProductActions,
  productActionId,
  orderActionId,
} from './constants';
import './AdminDashboard.scss';

class AdminDashboard extends Component {
  productRouteObject = id => {
    const { match } = this.props;
    switch (id) {
      case productActionId.addProduct:
        return { pathname: `${match.url}/products/add`, hash: 'new' };
      case productActionId.viewProduct:
        return { pathname: `${match.url}/products` };
      default:
        return { pathname: `${match.url}` };
    }
  };

  orderRouteObject = id => {
    const { match } = this.props;
    switch (id) {
      case orderActionId.viewOrders:
        return { pathname: `${match.url}/orders` };
      case orderActionId.updateOrderStatus:
        return { pathname: `${match.url}/orders` };
      default:
        return { pathname: `${match.url}` };
    }
  };

  render() {
    const { user } = this.props;
    return (
      <div className="adminDb-body">
        <div className="adminDb-user-welcome">
          Welcome back,{' '}
          <span>{user.full_name || user.first_name || user.last_name}</span>
        </div>
        <div className="adminDb-tab">PRODUCTS</div>
        <div className="adminDb-tabitems">
          {adminProductActions.map(item => (
            <Link key={item.id} to={() => this.productRouteObject(item.id)}>
              <div className="adminDb-actionCard center">
                <item.icon fontSize="large" />
                <p>{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="adminDb-tab">ORDERS</div>
        <div className="adminDb-tabitems">
          {adminOrderActions.map(item => (
            <Link to={() => this.orderRouteObject(item.id)} key={item.id}>
              <div className="adminDb-actionCard center">
                <item.icon fontSize="large" />
                <p>{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

export default connect(mapStateToProps, null)(AdminDashboard);
