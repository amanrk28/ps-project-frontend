import React from 'react';
import Input from 'components/common/Input/Input';
import './Address.scss';
import { ObjectType } from 'store/reducers/rootState';

const ADDRESS_FIELDS = [
  { name: 'House No.', dataname: 'house_no' },
  { name: 'Street', dataname: 'street' },
  { name: 'City', dataname: 'city' },
  { name: 'Pincode', dataname: 'pincode' },
];

interface AddressProps {
  addressObj: ObjectType;
  onChange: (e: React.FormEvent<HTMLInputElement>, dataname: string) => void;
}

const Address = ({ addressObj, onChange }: AddressProps) => {
  const getFieldValue = (dataname: string) => {
    if (addressObj && Object.keys(addressObj).includes(dataname))
      return addressObj[dataname];
    return '';
  };

  return (
    <>
      <p className="address-header">Address</p>
      <div className="address-wrapper">
        {ADDRESS_FIELDS.map(field => (
          <div className="address-fieldContainer" key={field.dataname}>
            <Input
              dataname={field.dataname}
              label={field.name}
              type={field.dataname === 'pincode' ? 'number' : 'text'}
              value={getFieldValue(field.dataname)}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                onChange(e, field.dataname)
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Address;
