import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import AddProduct from './AddProduct/AddProduct';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AdminHeader from './AdminHeader/AdminHeader';
import ViewProducts from './ViewProducts/ViewProducts';

const AdminRoutes = ({ match }) => {
  return (
    <div className="admin-wrapper">
      <AdminHeader />
      <div className="admin-body">
        <Switch>
          <Route
            path={`${match.path}/products/:id/edit`}
            component={AddProduct}
          />
          <Route path={`${match.path}/products/add`} component={AddProduct} />
          <Route path={`${match.path}/products`} component={ViewProducts} />
          <Route path={`${match.path}/`} component={AdminDashboard} exact />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(AdminRoutes);
