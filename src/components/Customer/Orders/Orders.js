import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'store/actions/orderActions';
import ListTable from 'components/common/ListTable/ListTable';
import { ORDER_STATUSES } from 'components/GlobalConstants';
import './Orders.scss';

const ORDER_TABLE_HEADERS = [
  { name: 'Order ID', dataname: 'id' },
  { name: 'Order Date', dataname: 'order_date' },
  { name: 'Expected Delivery Date', dataname: 'expected_delivery_date' },
  { name: 'Delivery Date', dataname: 'delivery_date' },
  { name: 'Status', dataname: 'status' },
];

class Orders extends Component {
  componentDidMount = () => {
    const { actions } = this.props;
    actions.getOrdersList({ orderStatus: '' });
  };

  onOpenOrderDetails = id => {
    const { history, match } = this.props;
    history.push(`${match.url}/${id}/view`);
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
    return (
      <div className="orders-wrapper">
        <div className="orders-header-wrapper center">
          <div className="orders-header">Your Orders</div>
        </div>
        <ListTable
          headers={ORDER_TABLE_HEADERS}
          dataList={orderList}
          tableFor="Orders"
          customTableWrapper="customTableWrapper"
          renderListItem={this.renderListItem}
          onClickListItem={this.onOpenOrderDetails}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orderList: state.order.orderList,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders));
