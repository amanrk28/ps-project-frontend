import React, { PureComponent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Input.scss';

class Input extends PureComponent {
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
      searchIcon = false,
    } = this.props;
    return (
      <>
        {label && <p className="input-label">{label}</p>}
        <div className={`input-wrapper ${inputClass || ''}`} style={style}>
          <div className="input-field">
            <input
              type={type}
              data-name={dataname}
              placeholder={placeholder}
              onChange={onChange}
              value={value || ''}
              maxLength={maxLength}
              onKeyDown={onKeyDown}
              disabled={disabled}
            />
            {searchIcon && <SearchIcon />}
          </div>
        </div>
      </>
    );
  }
}

export default Input;
