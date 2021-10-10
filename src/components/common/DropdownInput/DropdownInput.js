import React, { Component } from 'react';
import { Button, Menu, MenuItem, Wrapper } from 'react-aria-menubutton';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { createElementWithEvent } from 'utils/utils';
import './DropdownInput.scss';

class DropdownInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  onChange = (val, e) => {
    const { dataProps = {} } = this.props;
    createElementWithEvent({
      value: val,
      dataname: this.props.dataname,
      event: 'change',
      onChange: this.props.onChange,
      dataProps,
    });
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const {
      options,
      value,
      dataname,
      labelPlaceholder,
      isError,
      dataProps,
      errorClass,
      openClass = 'openClass',
      className = '',
    } = this.props;

    const { isOpen } = this.state;
    let itemLabel = value || '';

    if (options.length) {
      const items = options.filter(item => String(item.id) === String(value));
      if (items.length === 1) {
        itemLabel = items[0].name || itemLabel;
      }
    }

    return (
      <Wrapper
        onSelection={this.onChange}
        className={`dropdownInput-wrapper ${className}`}
        onMenuToggle={({ isOpen }) => {
          this.setState({ isOpen });
        }}
      >
        <Button
          className={`dropdownClass ${(isError && errorClass) || ''} ${
            (isOpen && openClass) || ''
          }`}
          {...dataProps}
        >
          {itemLabel ? (
            <div className="labelValue">{itemLabel}</div>
          ) : (
            <div className="labelName dropdownPlaceholderClass">
              {labelPlaceholder}
            </div>
          )}
          <div className="labelDownarrow">
            {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </div>
        </Button>

        <Menu className="dropdownInput-dropdownbox dropdownBoxClass">
          {options.map(item => (
            <MenuItem
              key={`_${item.id}`}
              className={`dropDownItemClass ${
                String(value) === String(item.id) && 'dropDownItemActiveClass'
              }`}
              data-name={dataname}
              data-label={item.name}
              data-value={item.id}
              value={item.id}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </Wrapper>
    );
  }
}

export default DropdownInput;
