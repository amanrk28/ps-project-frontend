import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import AdminRoutes from './Admin/AdminRoutes';
import CustomerRoutes from './Customer/CustomerRoutes';

class Routes extends Component {
  render() {
    const { match, user } = this.props;
    const { is_store_owner } = user;
    return (
      <Switch>
        <Route exact path={`${match.url}login`} component={LoginPage} />
        {is_store_owner ? (
          <Route path={`${match.url}admin`} component={AdminRoutes} />
        ) : (
          <Route path={match.url} component={CustomerRoutes} />
        )}
        <Redirect to={is_store_owner ? `${match.url}admin` : match.url} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

export default connect(mapStateToProps, null)(withRouter(Routes));
