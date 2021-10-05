import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as actions from 'store/actions/orderActions';
import { ORDER_ITEM_TABLE_HEADERS, CUSTOMER_FIELDS } from './constants';
import { getAddressString } from 'utils/utils';
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
    this.props.history.push('/admin/orders');
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
        <ul className="table-wrapper">
          <li>
            {ORDER_ITEM_TABLE_HEADERS.map(item => (
              <div
                key={item.dataname}
                className={`tableHeader ${item.dataname}`}
              >
                {item.name}
              </div>
            ))}
          </li>
          {orderItem.products &&
            orderItem.products.map(product => (
              <li key={product.id}>
                {ORDER_ITEM_TABLE_HEADERS.map(item => (
                  <div key={item.dataname} className={`${item.dataname}`}>
                    {item.dataname === 'image' && (
                      <img
                        src={product.product[item.dataname]}
                        alt={product.product.name}
                      />
                    )}
                    {['name', 'price'].includes(item.dataname) && (
                      <p>
                        {item.dataname === 'price' && <>&#8377;</>}
                        {product.product[item.dataname]}
                      </p>
                    )}
                    {['quantity', 'amount'].includes(item.dataname) && (
                      <p>
                        {item.dataname === 'amount' && <>&#8377;</>}
                        {product[item.dataname]}
                      </p>
                    )}
                  </div>
                ))}
              </li>
            ))}
        </ul>
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
