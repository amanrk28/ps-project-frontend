import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminDashboard from './AdminDashboard/AdminDashboard';

const AdminRoutes = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/`} component={AdminDashboard} exact />
      <Redirect to={`${match.path}/`} />
    </Switch>
  );
};

export default withRouter(AdminRoutes);
