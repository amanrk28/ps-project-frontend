import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { RootState } from 'store/reducers/rootState';
import AdminRoutes from './Admin/AdminRoutes';
import CustomerRoutes from './Customer/CustomerRoutes';
import Register from './Login/Register';

const Routes = () => {
  const { user } = useSelector((state: RootState) => ({ user: state.auth }));
  return (
    <Switch>
      <Route exact path="/login" component={Register} />
      {user.is_store_owner ? (
        <Route path="/admin" component={AdminRoutes} />
      ) : (
        <Route path="/" component={CustomerRoutes} />
      )}
      <Redirect to={user.is_store_owner ? '/admin' : '/'} />
    </Switch>
  );
};

export default Routes;
