import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import AccountPage from 'Pages/AccountPage';
import CartPage from 'Pages/CartPage';
import CheckoutPage from 'Pages/CheckoutPage';
import HomePage from 'Pages/HomePage';
import OrdersPage from 'Pages/OrdersPage';
import ProductDetailsPage from 'Pages/ProductDetailsPage';
import ViewOrderItem from 'components/Admin/ViewOrderItem/ViewOrderItem';
import Header from 'components/common/Header/Header';

interface CustomerRoutesProps extends RouteComponentProps {}

const CustomerRoutes = ({ match }: CustomerRoutesProps) => {
  return (
    <Switch>
      <Route path={`${match.path}cart`} component={CartPage} />
      <Route path={`${match.path}checkout`} component={CheckoutPage} />
      <Route
        path={`${match.path}orders/:id/view`}
        render={({ history, match }) => (
          <>
            <Header />
            <div style={{ padding: '2rem' }}>
              <ViewOrderItem history={history} match={match} />
            </div>
          </>
        )}
      />
      <Route path={`${match.path}orders`} component={OrdersPage} />
      <Route path={`${match.path}account`} component={AccountPage} />
      <Route
        exact
        path={`${match.path}products/:id`}
        component={ProductDetailsPage}
      />
      <Route exact path={`${match.path}`} component={HomePage} />
    </Switch>
  );
};

export default CustomerRoutes;
