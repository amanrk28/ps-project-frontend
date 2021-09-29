import React from 'react';
import DropdownInput from 'components/common/DropdownInput/DropdownInput';
import './Filter.scss';

const Filter = ({
  filterName = '',
  filterOptions = [],
  value = '',
  onChange,
  dataname = '',
}) => {
  return (
    <div className="filter-wrapper">
      <p>{filterName}</p>
      <DropdownInput
        options={[{ id: 'all', name: 'All' }, ...filterOptions]}
        value={value}
        onChange={onChange}
        labelPlaceholder="All"
        dataname={dataname}
      />
    </div>
  );
};

export default Filter;
