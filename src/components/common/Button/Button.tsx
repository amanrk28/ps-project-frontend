import React from 'react';
import './Button.scss';

interface ButtonProps {
  children?: JSX.Element | null;
  text?: string | null;
  onClick: () => void;
  dataProps?: object;
  type?: string;
  className?: string;
  isLoading?: boolean;
}

const Button = ({
  children,
  text = '',
  onClick,
  dataProps = {},
  type = 'primary',
  className = '',
  isLoading = false,
}: ButtonProps) => {
  let style = `center ${className}`;
  if (type === 'primary') style += ' primary';
  if (type === 'disabled') style += ' disabled';

  const content = children || text;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={type === 'disabled'}
      className={style}
      data-loading={isLoading}
      {...dataProps}
    >
      {isLoading ? <div className="button-loader" /> : content}
    </button>
  );
};

export default Button;
