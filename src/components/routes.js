import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import CheckoutPage from '../Pages/CheckoutPage';
import LoginPage from '../Pages/LoginPage';
import OrdersPage from '../Pages/OrdersPage';
import * as actions from '../store/actions/authActions';
import AdminRoutes from './Admin/AdminRoutes';

const defaultRedirectRoute = user => {
  let route = 'home';
  if (user && (user.is_admin || user.is_store_owner)) route = 'admin';
  return route;
};

class Routes extends Component {
  componentDidMount = () => {
    this.props.actions.verifyToken();
  };

  render() {
    const { match, user } = this.props;
    const { isCheckingAuth } = user;

    return (
      <Switch>
        <Route exact path={`${match.url}login`} component={LoginPage} />
        <Route
          path={`${match.url}`}
          render={() => {
            return isCheckingAuth ? (
              <div style={{ width: '100vw', height: '100vh' }} />
            ) : (
              <Switch>
                <Redirect
                  exact
                  path={`${match.url}`}
                  to={`${match.url}${defaultRedirectRoute(user)}`}
                />

                <Route
                  exact
                  path={`${match.url}checkout`}
                  component={CheckoutPage}
                />
                <Route
                  exact
                  path={`${match.url}orders`}
                  component={OrdersPage}
                />
                <Route
                  exact
                  path={`${match.url}admin`}
                  component={AdminRoutes}
                />
                <Route exact path={`${match.url}home`} component={HomePage} />
                <Redirect
                  path={`${match.url}`}
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

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
