import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  adminOrderActions,
  adminProductActions,
  productActionId,
  orderActionId,
} from './constants';
import './AdminDashboard.scss';
import { RootState } from 'store/reducers/rootState';

interface AdminDashboardProps extends RouteComponentProps {}

const AdminDashboard = ({ match }: AdminDashboardProps) => {
  const { user } = useSelector((state: RootState) => ({ user: state.auth }));

  const productRouteObject = (id: string) => {
    switch (id) {
      case productActionId.addProduct:
        return { pathname: `${match.url}/products/add`, hash: 'new' };
      case productActionId.viewProduct:
        return { pathname: `${match.url}/products` };
      default:
        return { pathname: `${match.url}` };
    }
  };

  const orderRouteObject = (id: string) => {
    switch (id) {
      case orderActionId.viewOrders:
        return { pathname: `${match.url}/orders` };
      case orderActionId.updateOrderStatus:
        return { pathname: `${match.url}/orders` };
      default:
        return { pathname: `${match.url}` };
    }
  };

  return (
    <div className="adminDb-body">
      <div className="adminDb-user-welcome">
        Welcome back,{' '}
        <span>{user.full_name || user.first_name || user.last_name}</span>
      </div>
      <div className="adminDb-tab">PRODUCTS</div>
      <div className="adminDb-tabitems">
        {adminProductActions.map(item => (
          <Link key={item.id} to={() => productRouteObject(item.id)}>
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
          <Link to={() => orderRouteObject(item.id)} key={item.id}>
            <div className="adminDb-actionCard center">
              <item.icon fontSize="large" />
              <p>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
