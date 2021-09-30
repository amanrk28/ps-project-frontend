import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import { RootState } from 'store/reducers/rootState';
import LoginPage from '../Pages/LoginPage';
import AdminRoutes from './Admin/AdminRoutes';
import CustomerRoutes from './Customer/CustomerRoutes';

interface RoutesProps extends RouteComponentProps {}

const Routes = ({ match }: RoutesProps) => {
  const { user } = useSelector((state: RootState) => ({ user: state.auth }));
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
