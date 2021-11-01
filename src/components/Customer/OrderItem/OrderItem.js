import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListTable from 'components/common/ListTable/ListTable';
import Button, { ButtonTypes } from 'components/common/Button/Button';
import Loading from 'components/common/Loading/Loading';
import * as actions from 'store/actions/orderActions';
import { getAddressString } from 'utils/utils';
import { ORDER_ITEM_TABLE_HEADERS, CUSTOMER_FIELDS } from './constants';
import './OrderItem.scss';

const ConfirmationModal = lazy(() => import('./confirmationModal'));

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfModal: false,
      cancellationTime: null,
    };
  }

  componentDidMount = () => {
    const { actions, match, orderItem } = this.props;
    const { id } = match.params;
    actions.getOrderItem({ id: parseInt(id, 10) });
    if (
      orderItem.cancellation_time_limit &&
      !['closed', 'cancelled'].includes(orderItem.status)
    ) {
      const date = new Date(this.props.orderItem.cancellation_time_limit);
      this.setState({ cancellationTime: date.getTime() });
    }
  };

  componentDidUpdate = () => {
    const { orderItem } = this.props;
    if (
      this.state.cancellationTime === null &&
      orderItem.cancellation_time_limit &&
      !['closed', 'cancelled'].includes(orderItem.status)
    ) {
      const date = new Date(this.props.orderItem.cancellation_time_limit);
      this.setState({ cancellationTime: date.getTime() });
    }
  };

  componentWillUnmount = () => {
    this.props.actions.resetOrder();
  };

  onClickBack = () => {
    this.props.history.push('/orders');
  };

  getTotalOrderValue = () => {
    const { orderItem } = this.props;
    let total = 0;
    if (orderItem && orderItem.products && orderItem.products.length > 0)
      orderItem.products.forEach(item => {
        total += item.amount;
      });
    return total;
  };

  onOpenModal = () => {
    this.setState({ showConfModal: true });
  };

  onCloseModal = () => {
    this.setState({ showConfModal: false });
  };

  onCancelOrder = () => {
    const { actions, orderItem } = this.props;
    actions.cancelOrder(orderItem.id);
    this.onCloseModal();
  };

  renderListItem = ({ item, dataItem }) => {
    return (
      <div className={`${item.dataname}`}>
        {item.dataname === 'image' && (
          <img
            src={dataItem.product[item.dataname]}
            alt={dataItem.product.name}
          />
        )}
        {['name', 'price'].includes(item.dataname) && (
          <p>
            {item.dataname === 'price' && <>&#8377;</>}
            {dataItem.product[item.dataname]}
          </p>
        )}
        {['quantity', 'amount'].includes(item.dataname) && (
          <p>
            {item.dataname === 'amount' && <>&#8377;</>}
            {dataItem[item.dataname]}
          </p>
        )}
      </div>
    );
  };

  render() {
    const { showConfModal, cancellationTime } = this.state;
    const { orderItem } = this.props;
    return (
      <>
        <Suspense fallback={<Loading />}>
          <ConfirmationModal
            showConfModal={showConfModal}
            onCloseModal={this.onCloseModal}
            onCancelOrder={this.onCancelOrder}
          />
        </Suspense>
        <div className="viewOrderItem-wrapper">
          <div className="viewOrderItem-header-wrapper center">
            <div className="goBack center" onClick={this.onClickBack}>
              <ArrowBackIcon />
            </div>
            <div className="viewOrderItem-header">Order Details</div>
          </div>
          <div className="viewOrderItem-secondary-header">
            <div className="customerDetails-leftSide">
              <h2>Customer Info:</h2>
              {CUSTOMER_FIELDS.map(field => (
                <div key={field.dataname}>
                  <p>
                    {field.name}: &nbsp;
                    <span>
                      {orderItem &&
                        orderItem.placed_by &&
                        field.dataname !== 'address' &&
                        orderItem.placed_by[field.dataname]}
                      {orderItem &&
                        orderItem.placed_by &&
                        field.dataname === 'address' &&
                        getAddressString(orderItem.placed_by?.address)}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <div className="customerDetails-rightSide">
              <Button
                text="Cancel Order"
                type={
                  cancellationTime > new Date().getTime()
                    ? ButtonTypes.Danger
                    : ButtonTypes.Disabled
                }
                onClick={this.onOpenModal}
              />
              <h2 className="orderTotal">
                Total Amount:
                <span>&nbsp;&#8377;{this.getTotalOrderValue()}</span>
              </h2>
            </div>
          </div>
          <ListTable
            headers={ORDER_ITEM_TABLE_HEADERS}
            dataList={orderItem.products || []}
            tableFor="Order"
            customTableWrapper="customTableWrapper"
            renderListItem={this.renderListItem}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  orderItem: state.order.orderItem,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
