import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminDashboard from './AdminDashboard/AdminDashboard';

class AdminRoutes extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/`} component={AdminDashboard} exact />
        <Redirect to={`${match.path}/`} />
      </Switch>
    );
  }
}

export default AdminRoutes;
