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
      value = '',
      style = {},
      label = '',
      inputClass = '',
      type = 'text',
      maxLength = '1000',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onKeyDown = () => {},
      disabled = false,
    } = this.props;
    return (
      <>
        {label && <p className="input-label">{label}</p>}
        <div className={`input-wrapper ${inputClass || ''}`} style={style}>
          <div className="input-field">
            <input
              ref={this.inputRef}
              type={type}
              data-name={dataname}
              placeholder={placeholder}
              onChange={onChange}
              value={value || ''}
              maxLength={maxLength}
              onKeyDown={onKeyDown}
              disabled={disabled}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Input;
