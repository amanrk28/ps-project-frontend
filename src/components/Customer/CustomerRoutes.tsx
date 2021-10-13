import React, { lazy, Suspense } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import Loading from 'components/common/Loading/Loading';

const AccountPage = lazy(() => import('Pages/AccountPage'));
const CartPage = lazy(() => import('Pages/CartPage'));
const CheckoutPage = lazy(() => import('Pages/CheckoutPage'));
const HomePage = lazy(() => import('Pages/HomePage'));
const OrdersPage = lazy(() => import('Pages/OrdersPage'));
const ProductDetailsPage = lazy(() => import('Pages/ProductDetailsPage'));
const ViewOrderItem = lazy(
  () => import('components/Admin/ViewOrderItem/ViewOrderItem')
);
const Header = lazy(() => import('components/common/Header/Header'));

interface CustomerRoutesProps extends RouteComponentProps {}

const CustomerRoutes = ({ match }: CustomerRoutesProps) => {
  return (
    <Suspense fallback={<Loading fullLoader />}>
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
    </Suspense>
  );
};

export default CustomerRoutes;
