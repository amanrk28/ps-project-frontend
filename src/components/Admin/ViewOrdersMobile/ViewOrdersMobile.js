import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as actions from 'store/actions/orderActions';
import Filter from 'components/Filter/Filter';
import { ORDER_STATUSES } from 'components/GlobalConstants';
import { queryStringify } from 'utils/utils';
import './ViewOrdersMobile.scss';
import Loading from 'components/common/Loading/Loading';

const USER_FIELDS = ['full_name', 'phone_number'];

const ORDER_TABLE_HEADERS = [
  { name: 'Order ID', dataname: 'id' },
  { name: 'Order Date', dataname: 'order_date' },
  { name: 'Placed By', dataname: 'full_name' },
  { name: 'Contact No', dataname: 'phone_number' },
  { name: 'Expected Delivery Date', dataname: 'expected_delivery_date' },
  { name: 'Status', dataname: 'status' },
];

const getStatus = status => {
  if (status === 'new') return 'Active';
  if (status === 'dispatched') return 'Dispatched';
  else return 'Completed';
};

class ViewOrdersMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusFilter: 'all',
      isLoading: false,
    };
  }
  componentDidMount = () => {
    const { actions, location } = this.props;
    let orderStatus = '';
    if (location?.query?.status) {
      orderStatus = location.query.status;
      this.setState({ statusFilter: orderStatus });
    }
    actions.getOrdersList({ orderStatus });
  };

  onClickBack = () => {
    this.props.history.push('/admin');
  };

  onChangeStatusFilter = e => {
    const { actions, history, location } = this.props;
    let { value } = e.target;
    let query = { ...location.query, status: value };
    if (value === 'all') {
      delete query.status;
    }
    history.push({ search: queryStringify(query) });
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

  render() {
    const { orderList } = this.props;
    const { statusFilter, isLoading } = this.state;

    return (
      <div className="viewOrdersMobile-wrapper">
        <div className="viewOrdersMobile-header-wrapper center">
          <div className="goBack center" onClick={this.onClickBack}>
            <ArrowBackIcon />
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
          <ul className="table-wrapper">
            {orderList.length > 0 ? (
              orderList.map(order => (
                <li
                  key={order.id}
                  onClick={() => this.onOpenOrderDetails(order.id)}
                >
                  {ORDER_TABLE_HEADERS.map(item => (
                    <div
                      className={`${item.dataname} ${order.status}`}
                      key={item.dataname}
                    >
                      {item.dataname !== 'status' && (
                        <div className="fieldName">{item.name}</div>
                      )}
                      {item.dataname === 'status' && getStatus(order.status)}
                      {item.dataname !== 'status' && order[item.dataname]}
                      {USER_FIELDS.includes(item.dataname) &&
                        order.placed_by[item.dataname]}
                    </div>
                  ))}
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
  location: state.router.location,
  orderList: state.order.orderList,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewOrdersMobile));
