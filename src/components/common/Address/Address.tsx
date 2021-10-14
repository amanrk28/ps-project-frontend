import React from 'react';
import Input from 'components/common/Input/Input';
import './Address.scss';
import { ObjectType } from 'store/reducers/rootState';
import { ADDRESS_FIELDS } from 'utils/utils';

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
          <div className="address-fieldContainer" key={field.id}>
            <Input
              dataname={field.id}
              label={field.name}
              type={field.id === 'pincode' ? 'number' : 'text'}
              value={getFieldValue(field.id)}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                onChange(e, field.id)
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(Address);
