import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ObjectType, RootState } from 'store/reducers/rootState';
import { updateUserDetails } from 'store/actions/authActions';
import Input from 'components/common/Input/Input';
import Button from 'components/common/Button/Button';
import './UserAccount.scss';
import Address from 'components/common/Address/Address';

const USER_FIELDS = [
  { name: 'First Name', dataname: 'first_name' },
  { name: 'Last Name', dataname: 'last_name' },
  { name: 'Email', dataname: 'email' },
  { name: 'Phone Number', dataname: 'phone_number' },
  { name: 'Address', dataname: 'address' },
];

const UserAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state: RootState) => ({ user: state.auth }));

  const [userData, setUserData] = useState<ObjectType>({});

  useEffect(() => {
    setUserData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
    });
  }, [user]);

  const onChange = (
    event: React.FormEvent<HTMLInputElement>,
    dataname: string
  ) => {
    const { value } = event.currentTarget;
    setUserData(prevState => ({ ...prevState, [dataname]: value }));
  };

  const onChangeAddress = (
    event: React.FormEvent<HTMLInputElement>,
    dataname: string
  ) => {
    const { value } = event.currentTarget;
    const address = { ...userData.address, [dataname]: value };
    setUserData(prevState => ({ ...prevState, address }));
  };

  const onSubmitUpdatedData = () => {
    dispatch(
      updateUserDetails({
        id: user.user_id,
        userData,
        cb: () => history.goBack(),
      })
    );
  };

  return (
    <div className="userAccount-wrapper center">
      <div className="userAccount-header center">Update Account Details</div>
      <div className="userAccount-gridContainer">
        {USER_FIELDS.map(field => {
          return field.dataname !== 'address' ? (
            <div key={field.dataname} className="userAccount-fieldContainer">
              <Input
                dataname={field.dataname}
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  onChange(event, field.dataname)
                }
                value={userData[field.dataname]}
                label={field.name}
                disabled={field.dataname === 'email'}
              />
            </div>
          ) : (
            <div key={field.dataname} className="userAccount-addressContainer">
              <Address
                addressObj={userData[field.dataname]}
                onChange={onChangeAddress}
              />
            </div>
          );
        })}
      </div>
      <div className="userAccount-btn">
        <Button text="Update" onClick={onSubmitUpdatedData} />
      </div>
    </div>
  );
};

export default UserAccount;
