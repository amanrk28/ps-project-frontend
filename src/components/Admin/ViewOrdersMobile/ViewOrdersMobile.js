import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MenuIcon from '@mui/icons-material/Menu';
import Filter from 'components/Filter/Filter';
import { ORDER_STATUSES } from 'components/GlobalConstants';
import Loading from 'components/common/Loading/Loading';
import DropdownInput from 'components/common/DropdownInput/DropdownInput';
import * as actions from 'store/actions/orderActions';
import { queryStringify } from 'utils/utils';
import './ViewOrdersMobile.scss';

const USER_FIELDS = ['full_name', 'phone_number'];

const ORDER_TABLE_HEADERS = [
  { name: 'Order ID', dataname: 'id' },
  { name: 'Order Date', dataname: 'order_date' },
  { name: 'Placed By', dataname: 'full_name' },
  { name: 'Contact No', dataname: 'phone_number' },
  { name: 'Expected Delivery Date', dataname: 'expected_delivery_date' },
];

class ViewOrdersMobile extends Component {
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

  onClickBack = () => {
    this.props.history.push('/admin');
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

  render() {
    const { orderList, toggleSidebar } = this.props;
    const { statusFilter, isLoading } = this.state;

    return (
      <div className="viewOrdersMobile-wrapper">
        <div className="viewOrdersMobile-header-wrapper center">
          <div className="menuIcon center" onClick={toggleSidebar}>
            <MenuIcon />
          </div>
          <div className="viewOrdersMobile-header">Orders</div>
        </div>
        <div className="viewOrdersMobile-filters-container">
          <Filter
            filterName="Order Status"
            filterOptions={ORDER_STATUSES}
            value={statusFilter}
            onChange={this.onChangeStatusFilter}
            dataname="status"
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <ul className="mobile-table-wrapper">
            {orderList.length > 0 ? (
              orderList.map(order => (
                <li key={order.id}>
                  <div
                    className="touchableContent"
                    onClick={() => this.onOpenOrderDetails(order.id)}
                  >
                    {ORDER_TABLE_HEADERS.map(item => (
                      <div className={`${item.dataname}`} key={item.dataname}>
                        {item.dataname !== 'status' && (
                          <div className="fieldName">{item.name}</div>
                        )}
                        {item.dataname !== 'status' && order[item.dataname]}
                        {USER_FIELDS.includes(item.dataname) &&
                          order.placed_by[item.dataname]}
                      </div>
                    ))}
                  </div>
                  <div className={`status ${order.status}`}>
                    <DropdownInput
                      options={
                        dataItem.status === 'dispatched'
                          ? [ORDER_STATUSES[1], ORDER_STATUSES[2]]
                          : dataItem.status === 'closed'
                          ? [ORDER_STATUSES[2]]
                          : dataItem.status === 'cancelled'
                          ? [ORDER_STATUSES[3]]
                          : ORDER_STATUSES
                      }
                      onChange={e => this.onChangeOrderStatus(e, order.id)}
                      value={order.status}
                      dataname="status"
                    />
                  </div>
                </li>
              ))
            ) : (
              <div className="tableEmpty center">
                No Orders available right now
              </div>
            )}
          </ul>
        )}
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
)(withRouter(ViewOrdersMobile));
