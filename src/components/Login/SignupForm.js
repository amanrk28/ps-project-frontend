import React, { Component } from 'react';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import { detectKeyPress, isEmail } from 'utils/utils';
import { NotifyMe } from 'components/common/NotifyMe/NotifyMe';

const SIGNUP_FIELDS = [
  { name: 'First Name', dataname: 'firstName', type: 'text' },
  { name: 'Last Name', dataname: 'lastName', type: 'text' },
  { name: 'Phone Number', dataname: 'phone', type: 'text' },
  { name: 'Email', dataname: 'email', type: 'email' },
  { name: 'Password', dataname: 'password', type: 'password' },
  { name: 'Confirm Password', dataname: 'checkPassword', type: 'password' },
];

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checkPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
    };
  }

  onChange = (e, dataname) => this.setState({ [dataname]: e.target.value });

  onClick = () => {
    const { email, password, checkPassword, firstName, lastName, phone } =
      this.state;
    if (!isEmail(email)) return NotifyMe('error', 'Invalid Email!');
    if (password !== checkPassword)
      return NotifyMe('error', 'Passwords do not match. Try again!');
    else {
      const dataPayload = {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
      };
      this.props.onSubmit(dataPayload);
    }
  };

  handleKeyDown = e => {
    if (detectKeyPress(e).enter) this.onClick();
  };

  render() {
    return (
      <div className="login-container center">
        {SIGNUP_FIELDS.map(item => (
          <Input
            key={item.dataname}
            dataname={item.dataname}
            onChange={e => this.onChange(e, item.dataname)}
            value={this.state[item.dataname]}
            placeholder={item.name}
            type={item.type}
            maxLength={item.dataname === 'phone' ? '10' : ''}
            inputClass="login-form-input"
            onKeyDown={this.handleKeyDown}
          />
        ))}
        <Button text="Signup" onClick={this.onClick} className="login-btn" />
      </div>
    );
  }
}

export default SignupForm;
