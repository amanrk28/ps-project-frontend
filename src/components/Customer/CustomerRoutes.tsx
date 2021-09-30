import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import CheckoutPage from 'Pages/CheckoutPage';
import HomePage from 'Pages/HomePage';
import OrdersPage from 'Pages/OrdersPage';

interface CustomerRoutesProps extends RouteComponentProps {}

const CustomerRoutes = ({ match }: CustomerRoutesProps) => {
  return (
    <Switch>
      <Route path={`${match.path}checkout`} component={CheckoutPage} />
      <Route path={`${match.path}orders`} component={OrdersPage} />
      <Route exact path={`${match.path}product/:id`} component={HomePage} />
      <Route exact path={`${match.path}`} component={HomePage} />
    </Switch>
  );
};

export default CustomerRoutes;
