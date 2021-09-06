import React from 'react';
import './Button.scss';

const Button = ({ text = '' }) => {
  return (
    <div className="btn__wrapper">
      <button>{text}</button>
    </div>
  );
};

export default Button;
