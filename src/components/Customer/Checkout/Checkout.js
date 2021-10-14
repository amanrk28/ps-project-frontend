import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Input from 'components/common/Input/Input';
import Button from 'components/common/Button/Button';
import * as actions from 'store/actions/cartActions';
import { convertDateStampToHumanDate, ADDRESS_FIELDS } from 'utils/utils';
import greenTick from './green-success-tick.svg';
import './Checkout.scss';

const USER_FIELDS = [
  { id: 'first_name', name: 'First Name' },
  { id: 'last_name', name: 'Last Name' },
  { id: 'phone_number', name: 'Phone' },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '0px',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: { house_no: '', street: '', city: '', pincode: '' },
      first_name: '',
      last_name: '',
      phone_number: '',
      isChanged: false,
      showOrderPlacedModal: false,
    };
  }

  componentDidMount = () => {
    const { user } = this.props;
    let stateObj = {};
    stateObj.address = user.address;
    USER_FIELDS.map(key => {
      stateObj[key.id] = user[key.id];
    });
    this.setState({ ...stateObj });
  };

  onClickBack = () => {
    this.props.history.goBack();
  };

  onChange = e => {
    const key = e.currentTarget.getAttribute('data-name');
    const { value } = e.target;
    this.setState({ [key]: value, isChanged: true });
  };

  onChangeAddress = e => {
    const key = e.currentTarget.getAttribute('data-name');
    const { value } = e.target;
    this.setState({
      address: { ...this.state.address, [key]: value },
      isChanged: true,
    });
  };

  onClickPlaceOrder = () => {
    const { actions } = this.props;
    const { isChanged, first_name, last_name, phone_number, address } =
      this.state;
    let reqData = {};
    if (isChanged) {
      reqData = { first_name, last_name, phone_number, address };
    }
    actions.createOrderFromCart(reqData, () =>
      this.setState({ showOrderPlacedModal: true })
    );
  };

  onCloseModal = () => {
    this.setState({ showOrderPlacedModal: false });
    this.props.history.push('/');
  };

  render() {
    const { showOrderPlacedModal } = this.state;
    const { totalAmount, cartCount } = this.props;
    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);

    return (
      <>
        <Modal open={showOrderPlacedModal} onClose={this.onCloseModal}>
          <Box sx={style}>
            <div className="imageWrapper center">
              <img src={greenTick} alt="Success" />
            </div>
            <p>Your order has been placed successfully!</p>
            <Button text="Close" onClick={this.onCloseModal} />
          </Box>
        </Modal>
        {!showOrderPlacedModal && (
          <div className="checkout-wrapper">
            <div className="checkout-header-wrapper center">
              <div className="goBack center" onClick={this.onClickBack}>
                <ArrowBackIcon />
              </div>
              <div className="checkout-header">Checkout</div>
            </div>
            <div className="checkout-complete-details">
              <div className="checkout-details-container">
                <div className="checkout-user">
                  <h2>1. Who are we delivering to?</h2>
                  {USER_FIELDS.map(item => (
                    <Input
                      key={item.id}
                      dataname={item.id}
                      value={this.state[item.id]}
                      onChange={this.onChange}
                      label={item.name}
                    />
                  ))}
                </div>
                <div className="checkout-address">
                  <h2>2. Where are we delivering?</h2>
                  {ADDRESS_FIELDS.map(item => (
                    <Input
                      key={item.id}
                      dataname={item.id}
                      value={this.state.address[item.id]}
                      onChange={this.onChangeAddress}
                      label={item.name}
                    />
                  ))}
                </div>
                <div className="checkout-payment">
                  <h2>3. Choose Payment Method</h2>
                  <FormControlLabel
                    value="end"
                    control={<Radio />}
                    label="Cash on Delivery"
                    checked
                  />
                </div>
              </div>
              <div className="checkout-order-summary">
                <h2>Order Summary</h2>
                <div>
                  <p>Items: </p>
                  <p>{cartCount}</p>
                </div>
                <div>
                  <p>Delivery: </p>
                  <p>{convertDateStampToHumanDate(deliveryDate)}</p>
                </div>
                <div className="orderTotal">
                  <p>Order Total:</p>
                  <p>&#8377; {totalAmount}</p>
                </div>
                <div className="orderSummary-placeOrder-btn center">
                  <Button text="Place Order" onClick={this.onClickPlaceOrder} />
                </div>
              </div>
            </div>
            <div className="placeOrder-btn center">
              <Button text="Place Order" onClick={this.onClickPlaceOrder} />
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  totalAmount: state.cart.total_amount,
  cartCount: state.cart.cart_count,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Checkout));
