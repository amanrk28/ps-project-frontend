import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Filter from 'components/Filter/Filter';
import { ORDER_STATUSES } from 'components/GlobalConstants';
import ListTable from 'components/common/ListTable/ListTable';
import DropdownInput from 'components/common/DropdownInput/DropdownInput';
import * as actions from 'store/actions/orderActions';
import { queryStringify } from 'utils/utils';
import './ViewOrders.scss';

const USER_FIELDS = ['full_name', 'phone_number'];

const ORDER_TABLE_HEADERS = [
  { name: 'Order ID', dataname: 'id' },
  { name: 'Placed By', dataname: 'full_name' },
  { name: 'Contact No', dataname: 'phone_number' },
  { name: 'Order Date', dataname: 'order_date' },
  { name: 'Expected Delivery Date', dataname: 'expected_delivery_date' },
  { name: 'Status', dataname: 'status' },
  { name: 'View', dataname: 'edit' },
];

class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusFilter: 'all',
      isLoading: false,
    };
  }
  componentDidMount = () => {
    const { actions, query } = this.props;
    let orderStatus = '';
    if (query?.status) {
      orderStatus = query.status;
      this.setState({ statusFilter: orderStatus });
    }
    actions.getOrdersList({ orderStatus });
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

  onOpenOrderDetails = id => {
    const { history, match } = this.props;
    history.push(`${match.url}/${id}/view`);
  };

  onChangeOrderStatus = (e, id) => {
    const { actions } = this.props;
    actions.updateOrderStatus(id, { status: e.target.value });
  };

  renderListItem = ({ item, dataItem }) => {
    return (
      <div
        className={`${item.dataname} ${dataItem.status}`}
        key={item.dataname}
      >
        {item.dataname === 'status' && (
          <DropdownInput
            options={
              ['dispatched', 'closed'].includes(dataItem.status)
                ? ORDER_STATUSES.filter(
                    x => x.id !== 'new' && x.id !== 'cancelled'
                  )
                : dataItem.status === 'cancelled'
                ? ORDER_STATUSES.filter(x => x.id === 'cancelled')
                : ORDER_STATUSES
            }
            onChange={e => this.onChangeOrderStatus(e, dataItem.id)}
            value={dataItem.status}
            dataname="status"
          />
        )}
        {USER_FIELDS.includes(item.dataname) &&
          dataItem.placed_by[item.dataname]}
        {item.dataname === 'edit' && (
          <div onClick={() => this.onOpenOrderDetails(dataItem.id)}>
            <ModeEditIcon />
          </div>
        )}
        {item.dataname !== 'status' && dataItem[item.dataname]}
      </div>
    );
  };

  render() {
    const { orderList } = this.props;
    const { statusFilter, isLoading } = this.state;

    return (
      <div className="viewOrders-wrapper">
        <div className="viewOrders-header-wrapper center">
          <div className="viewOrders-header">Orders</div>
        </div>
        <div className="viewOrders-filters-container">
          <Filter
            filterName="Order Status"
            filterOptions={ORDER_STATUSES}
            value={statusFilter}
            onChange={this.onChangeStatusFilter}
            dataname="status"
          />
        </div>
        <ListTable
          headers={ORDER_TABLE_HEADERS}
          dataList={orderList}
          isLoading={isLoading}
          tableFor="Orders"
          customTableWrapper="customTableWrapper"
          renderListItem={this.renderListItem}
        />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewOrders));
