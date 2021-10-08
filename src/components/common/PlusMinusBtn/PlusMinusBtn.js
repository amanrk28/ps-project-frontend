import React from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import './PlusMinusBtn.scss';
import RemoveIcon from '@mui/icons-material/Remove';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const PlusMinusBtn = ({ count = 0, updateCartCount }) => {
  const decCount = () => {
    updateCartCount(count - 1);
  };
  const incCount = () => {
    updateCartCount(count + 1);
  };
  return (
    <div className="plusMinusBtn-wrapper">
      <div className="center" onClick={decCount}>
        {count === 1 ? <DeleteOutlineOutlinedIcon /> : <RemoveIcon />}
      </div>
      <div className="center">{count}</div>
      <div className="center" onClick={incCount}>
        <AddOutlinedIcon />
      </div>
    </div>
  );
};

export default PlusMinusBtn;
