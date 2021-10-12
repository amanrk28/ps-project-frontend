import React, { lazy, Suspense, useState } from 'react';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Loading from 'components/common/Loading/Loading';
import AdminSidebar from './AdminDashboard/AdminDashboard';
import AddUpdateProduct from './AddUpdateProduct/AddUpdateProduct';
import ViewOrderItem from './ViewOrderItem/ViewOrderItem';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-body">
        <AdminSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div style={{ width: `calc(100vw - 70px)` }}>
          <Switch>
            <Route
              path={`${match.path}/products/:id/edit`}
              component={AddUpdateProduct}
            />
            <Route
              path={`${match.path}/products/add`}
              render={() => <AddUpdateProduct toggleSidebar={toggleSidebar} />}
            />
            <Route
              path={`${match.path}/products`}
              render={() => (
                <Suspense fallback={<Loading fullLoader />}>
                  {isMobile ? (
                    <ViewProductsMobile toggleSidebar={toggleSidebar} />
                  ) : (
                    <ViewProducts />
                  )}
                </Suspense>
              )}
            />
            <Route
              path={`${match.path}/orders/:id/view`}
              component={ViewOrderItem}
            />
            <Route
              path={`${match.path}/orders`}
              render={() => (
                <Suspense fallback={<Loading fullLoader />}>
                  {isMobile ? (
                    <ViewOrdersMobile toggleSidebar={toggleSidebar} />
                  ) : (
                    <ViewOrders />
                  )}
                </Suspense>
              )}
            />
            <Redirect path={`${match.path}/`} to={`${match.path}/products`} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;
