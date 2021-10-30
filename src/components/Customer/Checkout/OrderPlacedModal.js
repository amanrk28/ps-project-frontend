import { Modal, Box } from '@mui/material';
import greenTick from './green-success-tick.svg';
import Button from 'components/common/Button/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '0px',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export default function OrderPlacedModal({
  showOrderPlacedModal,
  onCloseModal,
}) {
  return (
    <Modal open={showOrderPlacedModal} onClose={onCloseModal}>
      <Box sx={style}>
        <div className="imageWrapper center">
          <img src={greenTick} alt="Success" />
        </div>
        <p>Your order has been placed successfully!</p>
        <p>Note: You will have 1 hour from now to cancel your order!</p>
        <Button text="Close" onClick={onCloseModal} />
      </Box>
    </Modal>
  );
}
