import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard/AdminDashboard';

const AdminRoutes = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/add`} component={AdminDashboard} />
      <Route path={`${match.path}/`} component={AdminDashboard} exact />
    </Switch>
  );
};

export default withRouter(AdminRoutes);
