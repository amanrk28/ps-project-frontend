import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import AdminRoutes from './Admin/AdminRoutes';
import * as actions from '../store/actions/authActions';
import CustomerRoutes from './Customer/CustomerRoutes';

const defaultRedirectRoute = user => {
  let route = 'home';
  if (user && user.is_store_owner) route = 'admin';
  return route;
};

class Routes extends Component {
  componentDidMount = () => {
    this.props.actions.verifyToken();
  };

  render() {
    const { match, user } = this.props;
    const { isCheckingAuth, is_store_owner } = user;

    return (
      <Switch>
        <Route exact path={`${match.url}login`} component={LoginPage} />
        <Route
          path={match.url}
          render={() => {
            return isCheckingAuth ? (
              <div style={{ width: '100vw', height: '100vh' }} />
            ) : (
              <Switch>
                <Redirect
                  path={match.url}
                  to={`${match.url}${defaultRedirectRoute(user)}`}
                  exact
                />
                {is_store_owner && (
                  <Route path={`${match.url}admin`} component={AdminRoutes} />
                )}
                <Route path={match.url} component={CustomerRoutes} />
                <Redirect
                  path={match.url}
                  to={`${match.url}${defaultRedirectRoute(user)}`}
                />
              </Switch>
            );
          }}
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Routes));

// <>
//   <Route exact path="/checkout" component={CheckoutPage} />
//   <Route exact path="/orders" component={OrdersPage} />
//   <Route exact path="/home/:id" component={HomePage} />
//   <Route exact path="/home" component={HomePage} />
// </>
