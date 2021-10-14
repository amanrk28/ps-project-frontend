import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { RootState } from 'store/reducers/rootState';
import Loading from './common/Loading/Loading';

const AdminRoutes = lazy(() => import('./Admin/AdminRoutes'));
const CustomerRoutes = lazy(() => import('./Customer/CustomerRoutes'));
const Register = lazy(() => import('./Login/Register'));

const Routes = () => {
  const user = useSelector((state: RootState) => state.auth);
  return (
    <Suspense fallback={<Loading fullLoader />}>
      <Switch>
        <Route exact path="/login" component={Register} />
        {user.is_store_owner ? (
          <Route path="/admin" component={AdminRoutes} />
        ) : (
          <Route path="/" component={CustomerRoutes} />
        )}
        <Redirect to={user.is_store_owner ? '/admin' : '/'} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
