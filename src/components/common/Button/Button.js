import React from 'react';
import './Button.scss';

const Button = ({
  text = '',
  onClick,
  dataProps = {},
  type = 'primary',
  className = '',
}) => {
  let style = `center ${className}`;
  if (type === 'primary') style += ' primary';
  if (type === 'disabled') style += ' disabled';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={type === 'disabled'}
      className={style}
      {...dataProps}
    >
      {text}
    </button>
  );
};

export default Button;
