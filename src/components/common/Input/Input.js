import React, { PureComponent } from 'react';
import './Input.scss';

class Input extends PureComponent {
  inputRef = React.createRef();
  componentDidMount = () => {
    this.inputRef.current.focus();
  };

  render() {
    const {
      dataname,
      placeholder = '',
      onChange,
      value,
      style = {},
      inputClass = '',
      type = 'text',
      maxLength = '1000',
      onKeyDown = () => {},
    } = this.props;
    return (
      <div className={`input-wrapper ${inputClass || ''}`} style={style}>
        <div className="input-field">
          <input
            ref={this.inputRef}
            type={type}
            data-name={dataname}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            maxLength={maxLength}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    );
  }
}

export default Input;
