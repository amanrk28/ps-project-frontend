import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import * as productActions from '../store/actions/productActions';
import * as actions from '../store/actions/authActions';
import Routes from './routes';

class Index extends Component {
  componentDidMount = () => {
    const { productActions, actions } = this.props;
    productActions.getProductCategories();
    productActions.getProducts();
    actions.verifyToken();
  };

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <ToastContainer />
        <Switch>
          <Route path="/" component={Routes} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  productActions: bindActionCreators(productActions, dispatch),
  actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(Index);
