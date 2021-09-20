import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CheckoutPage from 'Pages/CheckoutPage';
import HomePage from 'Pages/HomePage';
import OrdersPage from 'Pages/OrdersPage';

const CustomerRoutes = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}checkout`} component={CheckoutPage} />
      <Route path={`${match.path}orders`} component={OrdersPage} />
      <Route exact path={`${match.path}home/:id`} component={HomePage} />
      <Route exact path={`${match.path}home`} component={HomePage} />
      <Redirect to={`${match.path}home`} />
    </Switch>
  );
};

export default CustomerRoutes;
