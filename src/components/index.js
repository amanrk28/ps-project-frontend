import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { verifyToken } from 'store/actions/authActions';
import { getProductCategories } from 'store/actions/productActions';
import Loading from './common/Loading/Loading';

const AdminRoutes = lazy(() => import('./Admin/AdminRoutes'));
const CustomerRoutes = lazy(() => import('./Customer/CustomerRoutes'));
const Register = lazy(() => import('./Login/Register'));

class Index extends Component {
  componentDidMount = () => {
    const { dispatchGetProductCategories, dispatchVerifyToken } = this.props;
    dispatchGetProductCategories();
    dispatchVerifyToken();
  };

  render() {
    const { user } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <ToastContainer />
        {user.isLoading && <Loading fullLoader />}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  dispatchVerifyToken: () => dispatch(verifyToken()),
  dispatchGetProductCategories: () => dispatch(getProductCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
