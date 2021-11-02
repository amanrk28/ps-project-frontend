import React, { Component, Suspense, lazy } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { bindActionCreators } from 'redux';
import Filter from 'components/Filter/Filter';
import Loading from 'components/common/Loading/Loading';
import { ORDER_STATUSES } from 'components/GlobalConstants';
import * as actions from 'store/actions/orderActions';
import { queryStringify } from 'utils/utils';
import './Orders.scss';

const OrdersMobile = lazy(() => import('./OrdersMobile'));
const OrdersDesktop = lazy(() => import('./OrdersDesktop'));

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusFilter: 'all',
      isLoading: true,
    };
  }
  componentDidMount = () => {
    const { actions, query } = this.props;
    let orderStatus = '';
    if (query?.status) {
      orderStatus = query.status;
      this.setState({ statusFilter: orderStatus });
    }
    actions.getOrdersList({
      orderStatus,
      cb: () => this.setState({ isLoading: false }),
    });
  };

  onOpenOrderDetails = id => {
    const { history, match } = this.props;
    history.push(`${match.url}/${id}/view`);
  };

  onChangeStatusFilter = e => {
    const { actions, history, query } = this.props;
    let { value } = e.target;
    let queryObj = { ...query, status: value };
    if (value === 'all') {
      delete queryObj.status;
    }
    history.push({ search: queryStringify(queryObj) });
    this.setState({ isLoading: true });
    const onCb = () => {
      this.setState({ isLoading: false });
    };
    actions.getOrdersList({ orderStatus: value, cb: onCb });
    this.setState({ statusFilter: value });
  };

  renderListItem = ({ item, dataItem }) => {
    return (
      <div
        className={`${item.dataname} ${
          item.dataname === 'status' ? dataItem.status : ''
        }`}
      >
        {item.dataname === 'status'
          ? ORDER_STATUSES.find(x => x.id === dataItem.status).name
          : dataItem[item.dataname] || 'N/A'}
      </div>
    );
  };

  render() {
    const { orderList } = this.props;
    const { statusFilter, isLoading } = this.state;
    return (
      <div className="orders-wrapper">
        <div className="orders-header-wrapper center">
          <div className="orders-header">Your Orders</div>
        </div>
        <div className="orders-filters-container">
          <Filter
            filterName="Filter by Status"
            filterOptions={ORDER_STATUSES}
            value={statusFilter}
            onChange={this.onChangeStatusFilter}
            dataname="status"
          />
        </div>
        <Suspense fallback={<Loading />}>
          {isMobile ? (
            <OrdersMobile
              orderList={orderList}
              onOpenOrderDetails={this.onOpenOrderDetails}
            />
          ) : (
            <OrdersDesktop
              orderList={orderList}
              isLoading={isLoading}
              renderListItem={this.renderListItem}
              onOpenOrderDetails={this.onOpenOrderDetails}
            />
          )}
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: state.router.location.query,
  orderList: state.order.orderList,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders));
