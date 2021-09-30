import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AdminHeader from './AdminHeader/AdminHeader';
import AddUpdateProduct from './AddUpdateProduct/AddUpdateProduct';
import ViewProducts from './ViewProducts/ViewProducts';
import ViewOrders from './ViewOrders/ViewOrders';

interface AdminRoutesProps extends RouteComponentProps {}

const AdminRoutes = ({ match }: AdminRoutesProps) => {
  return (
    <div className="admin-wrapper">
      <AdminHeader />
      <div className="admin-body">
        <Switch>
          <Route
            path={`${match.path}/products/:id/edit`}
            component={AddUpdateProduct}
          />
          <Route
            path={`${match.path}/products/add`}
            component={AddUpdateProduct}
          />
          <Route path={`${match.path}/products`} component={ViewProducts} />
          {/* <Route
            path={`${match.path}/orders/:id/view`}
            component={ViewOrders}
          /> */}
          <Route path={`${match.path}/orders`} component={ViewOrders} />
          <Route path={`${match.path}/`} component={AdminDashboard} exact />
        </Switch>
      </div>
    </div>
  );
};

export default AdminRoutes;
