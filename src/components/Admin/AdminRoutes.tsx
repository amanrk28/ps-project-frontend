import React, { lazy, Suspense } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Loading from 'components/common/Loading/Loading';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AdminHeader from './AdminHeader/AdminHeader';
import AddUpdateProduct from './AddUpdateProduct/AddUpdateProduct';

const ViewProductsMobile = lazy(
  () => import('./ViewProductsMobile/ViewProductsMobile')
);
const ViewProducts = lazy(() => import('./ViewProducts/ViewProducts'));
const ViewOrders = lazy(() => import('./ViewOrders/ViewOrders'));
const ViewOrdersMobile = lazy(
  () => import('./ViewOrdersMobile/ViewOrdersMobile')
);

interface AdminRoutesProps extends RouteComponentProps {}

const AdminRoutes = ({ match }: AdminRoutesProps) => {
  return (
    <div className="admin-wrapper">
      <AdminHeader />
      <div className="admin-body">
        <Switch>
          <Route
            path={`${match.path}/products/:id/edit`}
            component={AddUpdateProduct}
          />
          <Route
            path={`${match.path}/products/add`}
            component={AddUpdateProduct}
          />
          <Route
            path={`${match.path}/products`}
            render={() => (
              <Suspense fallback={<Loading />}>
                {isMobile ? <ViewProductsMobile /> : <ViewProducts />}
              </Suspense>
            )}
          />
          {/* <Route
            path={`${match.path}/orders/:id/view`}
            component={ViewOrders}
          /> */}
          <Route
            path={`${match.path}/orders`}
            render={() => (
              <Suspense fallback={<Loading />}>
                {isMobile ? <ViewOrdersMobile /> : <ViewOrders />}
              </Suspense>
            )}
          />
          <Route path={`${match.path}/`} component={AdminDashboard} exact />
        </Switch>
      </div>
    </div>
  );
};

export default AdminRoutes;
