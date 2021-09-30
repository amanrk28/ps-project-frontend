import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import AdminRoutes from './Admin/AdminRoutes';
import CustomerRoutes from './Customer/CustomerRoutes';

const Routes = ({ match }) => {
  const { user } = useSelector(state => state.auth);
  return (
    <Switch>
      <Route exact path={`${match.url}login`} component={LoginPage} />
      {user.is_store_owner ? (
        <Route path={`${match.url}admin`} component={AdminRoutes} />
      ) : (
        <Route path={match.url} component={CustomerRoutes} />
      )}
      <Redirect to={user.is_store_owner ? `${match.url}admin` : match.url} />
    </Switch>
  );
};

export default Routes;
