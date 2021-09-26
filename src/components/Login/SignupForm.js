import React, { Component } from 'react';
import { detectKeyPress, isEmail } from 'utils/utils';
import { NotifyMe } from 'components/common/NotifyMe/NotifyMe';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';

const SIGNUP_FIELDS = [
  { name: 'First Name', dataname: 'firstName', type: 'text', required: true },
  { name: 'Last Name', dataname: 'lastName', type: 'text', required: false },
  { name: 'Phone Number', dataname: 'phone', type: 'text', required: true },
  { name: 'Email', dataname: 'email', type: 'email', required: true },
  {
    name: 'Password',
    dataname: 'password',
    type: 'password',
    required: true,
  },
  {
    name: 'Confirm Password',
    dataname: 'checkPassword',
    type: 'password',
    required: true,
  },
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
      const sanityCheck = SIGNUP_FIELDS.filter(x => {
        if (x.required && !this.state[x.dataname]) {
          NotifyMe('error', `${x.name} is mandatory!`);
          return true;
        }
        return false;
      });
      if (sanityCheck.length > 0) return;
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
