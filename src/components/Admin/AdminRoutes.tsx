import React, { lazy, Suspense, useState, useCallback, useMemo } from 'react';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Loading from 'components/common/Loading/Loading';

const AddUpdateProduct = lazy(
  () => import('./AddUpdateProduct/AddUpdateProduct')
);
const ViewOrderItem = lazy(() => import('./ViewOrderItem/ViewOrderItem'));
const AdminSidebar = lazy(() => import('./AdminDashboard/AdminDashboard'));
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

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  const sidebarOpenMemo = useMemo<boolean>(
    () => isSidebarOpen,
    [isSidebarOpen]
  );

  return (
    <div className="admin-wrapper">
      <div className="admin-body">
        <Suspense fallback={<Loading />}>
          <AdminSidebar
            isSidebarOpen={sidebarOpenMemo}
            toggleSidebar={toggleSidebar}
          />
        </Suspense>
        <div style={{ width: `calc(100vw - 70px)` }}>
          <Suspense fallback={<Loading fullLoader />}>
            <Switch>
              <Route
                path={`${match.path}/products/:id/edit`}
                component={AddUpdateProduct}
              />
              <Route
                path={`${match.path}/products/add`}
                render={({ match, location, history }) => (
                  <AddUpdateProduct
                    match={match}
                    location={location}
                    history={history}
                    toggleSidebar={toggleSidebar}
                  />
                )}
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
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminRoutes);
