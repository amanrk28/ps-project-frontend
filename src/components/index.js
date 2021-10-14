import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Loading from './common/Loading/Loading';
import Routes from './routes';
import { verifyToken } from 'store/actions/authActions';
import { getProductCategories } from 'store/actions/productActions';

class Index extends Component {
  componentDidMount = () => {
    const { getProductCategories, verifyToken } = this.props;
    getProductCategories();
    verifyToken();
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
  verifyToken: () => dispatch(verifyToken()),
  getProductCategories: () => dispatch(getProductCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
