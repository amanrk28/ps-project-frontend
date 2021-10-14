import React, { useState, memo, useMemo } from 'react';
import { Button, Menu, MenuItem, Wrapper } from 'react-aria-menubutton';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './DropdownInput.scss';

const DropdownInput = ({
  options,
  value,
  dataname,
  labelPlaceholder = '',
  isError = false,
  dataProps = {},
  errorClass = '',
  openClass = 'openClass',
  className = '',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeValue = (val, e) => {
    e.preventDefault();
    e.stopPropagation();
    const elem = document.createElement('input');
    elem.setAttribute('data-name', dataname);
    elem.setAttribute('value', val);
    elem.addEventListener('change', onChange);
    elem.dispatchEvent(new Event('change'));
  };

  const itemLabel = useMemo(() => {
    let label = value || '';
    if (options.length) {
      const item = options.find(item => String(item.id) === String(value));
      if (item) {
        label = item.name || label;
      }
    }
    return label;
  }, [value, options]);

  return (
    <Wrapper
      onSelection={onChangeValue}
      className={`dropdownInput-wrapper ${className}`}
      onMenuToggle={({ isOpen }) => {
        setIsOpen(isOpen);
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
};

export default memo(DropdownInput);
