import React, { useState } from 'react';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import { isEmail } from 'utils/utils';

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
  const onClick = () => {
    if (!isEmail(email)) return console.log('Invalid Email');
    onSubmit({ email, password });
  };
  return (
    <div className="login-container center">
      {LOGIN_FIELDS.map(item => (
        <div className="input-container" key={item.dataname}>
          <Input
            dataname={item.dataname}
            placeholder={item.name}
            onChange={e => onChange(e, item.dataname)}
            value={item.dataname === 'email' ? email : password}
            type={item.dataname}
            style={{ width: '250px' }}
          />
        </div>
      ))}
      <Button text="Signin" onClick={onClick} className="login-btn" />
    </div>
  );
};

export default SigninForm;
