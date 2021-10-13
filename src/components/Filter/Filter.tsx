import React from 'react';
import DropdownInput from 'components/common/DropdownInput/DropdownInput';
import { ObjectType } from 'store/reducers/rootState';
import './Filter.scss';

interface FilterProps {
  filterName?: string;
  filterOptions: ObjectType[];
  value: string;
  onChange: () => void;
  dataname: string;
}

const Filter = ({
  filterName = '',
  filterOptions = [],
  value = '',
  onChange,
  dataname = '',
}: FilterProps) => {
  return (
    <div className="filter-wrapper">
      {filterName && <p>{filterName}</p>}
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
