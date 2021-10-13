import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Loading from './common/Loading/Loading';
import Routes from './routes';
import * as actions from '../store/actions/authActions';
import * as productActions from '../store/actions/productActions';

class Index extends Component {
  componentDidMount = () => {
    const { productActions, actions } = this.props;
    productActions.getProductCategories();
    actions.verifyToken();
  };

  render() {
    const { isLoading } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <ToastContainer />
        {isLoading && <Loading fullLoader />}
        <Routes />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
  productActions: bindActionCreators(productActions, dispatch),
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
