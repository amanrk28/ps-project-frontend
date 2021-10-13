import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListTable from 'components/common/ListTable/ListTable';
import * as actions from 'store/actions/orderActions';
import { getAddressString } from 'utils/utils';
import { ORDER_ITEM_TABLE_HEADERS, CUSTOMER_FIELDS } from './constants';
import './ViewOrderItem.scss';

class ViewOrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { actions, match } = this.props;
    const { id } = match.params;
    actions.getOrderItem({ id: parseInt(id, 10) });
  };

  onClickBack = () => {
    this.props.history.goBack();
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

  renderListItem = ({ item, dataItem }) => {
    return (
      <div key={item.dataname} className={`${item.dataname}`}>
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
    const { orderItem } = this.props;
    return (
      <div className="viewOrderItem-wrapper">
        <div className="viewOrderItem-header-wrapper center">
          <div className="goBack center" onClick={this.onClickBack}>
            <ArrowBackIcon />
          </div>
          <div className="viewOrderItem-header">Order Details</div>
        </div>
        <div className="viewOrderItem-secondary-header">
          <div className="customerDetails">
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
          <h2 className="orderTotal">
            Total Amount:
            <span>&nbsp;&#8377;{this.getTotalOrderValue()}</span>
          </h2>
        </div>
        <ListTable
          headers={ORDER_ITEM_TABLE_HEADERS}
          dataList={orderItem.products || []}
          tableFor="Order"
          customTableWrapper="customTableWrapper"
          renderListItem={this.renderListItem}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orderItem: state.order.orderItem,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrderItem);
