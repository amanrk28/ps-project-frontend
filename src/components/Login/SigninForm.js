import React, { useState } from 'react';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import { detectKeyPress, isEmail } from 'utils/utils';
import { NotifyMe } from 'components/common/NotifyMe/NotifyMe';

const LOGIN_FIELDS = [
  {
    name: 'Email',
    dataname: 'email',
  },
  { name: 'Password', dataname: 'password' },
];

const SigninForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e, dataname) => {
    const { value } = e.target;
    if (dataname === 'email') setEmail(value);
    else setPassword(value);
  };

  const handleKeyDown = e => {
    if (detectKeyPress(e).enter) onClick();
  };

  const onClick = () => {
    if (!isEmail(email)) return NotifyMe('error', 'Invalid Email!');
    onSubmit({ email, password });
  };

  return (
    <div className="login-container center">
      {LOGIN_FIELDS.map(item => (
        <Input
          key={item.dataname}
          dataname={item.dataname}
          placeholder={item.name}
          onChange={e => onChange(e, item.dataname)}
          value={item.dataname === 'email' ? email : password}
          type={item.dataname}
          inputClass="login-form-input"
          onKeyDown={handleKeyDown}
        />
      ))}
      <Button text="Signin" onClick={onClick} className="login-btn" />
    </div>
  );
};

export default SigninForm;
