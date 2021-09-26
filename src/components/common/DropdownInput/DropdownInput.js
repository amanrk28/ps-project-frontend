import React, { Component } from 'react';
import { Button, Menu, MenuItem, Wrapper } from 'react-aria-menubutton';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './DropdownInput.scss';
import { createElementWithEvent } from 'utils/utils';

const ToggleIcon = ({ open }) => (
  <div className="labelDownarrow">
    {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
  </div>
);

class DropdownInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  onChange = (val, e) => {
    const { dataProps = {} } = this.props;
    const elem = createElementWithEvent({
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
      dropdownClass,
      dropdownPlaceholderClass,
      dropdownBoxClass,
      dropDownItemClass,
      dropDownItemActiveClass,
      errorClass,
      openClass,
      className = '',
    } = this.props;

    const { isOpen } = this.state;
    let itemLabel = value || '';

    if (options.length) {
      const items = options.filter(item => item === value);
      if (items.length === 1) {
        itemLabel = items[0] || itemLabel;
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
          className={`${dropdownClass || ''} ${(isError && errorClass) || ''} ${
            (isOpen && openClass) || ''
          }`}
          {...dataProps}
        >
          {itemLabel ? (
            <div className="labelValue">{itemLabel}</div>
          ) : (
            <div className={`labelName ${dropdownPlaceholderClass}`}>
              {labelPlaceholder}
            </div>
          )}
          <ToggleIcon open={isOpen} />
        </Button>

        <Menu className={`dropdownInput-dropdownbox ${dropdownBoxClass}`}>
          {options.map(item => (
            <MenuItem
              key={`_${item}`}
              className={`${dropDownItemClass} ${
                value === item && dropDownItemActiveClass
              }`}
              data-name={dataname}
              data-value={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
      </Wrapper>
    );
  }
}

export default DropdownInput;
