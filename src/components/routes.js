import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import AdminRoutes from './Admin/AdminRoutes';
import CustomerRoutes from './Customer/CustomerRoutes';

class Routes extends Component {
  render() {
    const { match, user } = this.props;
    const { is_store_owner } = user;

    console.log(match.url);
    return (
      <Switch>
        <Route exact path={`${match.url}login`} component={LoginPage} />
        <>
          {is_store_owner ? (
            <Route path={`${match.url}admin`} component={AdminRoutes} />
          ) : (
            <Route path={match.url} component={CustomerRoutes} />
          )}
        </>
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

export default connect(mapStateToProps, null)(withRouter(Routes));

// <>
//   <Route exact path="/checkout" component={CheckoutPage} />
//   <Route exact path="/orders" component={OrdersPage} />
//   <Route exact path="/home/:id" component={HomePage} />
//   <Route exact path="/home" component={HomePage} />
// </>
