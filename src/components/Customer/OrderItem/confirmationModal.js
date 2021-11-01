import { Modal, Box } from '@mui/material';
import Button, { ButtonTypes } from 'components/common/Button/Button';

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

const buttonWrapperStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gridGap: '1rem',
  marginTop: '1rem',
};

export default function ConfirmationModal({
  showConfModal,
  onCloseModal,
  onCancelOrder,
}) {
  return (
    <Modal open={showConfModal} onClose={onCloseModal}>
      <Box sx={style}>
        <h4 style={{ textAlign: 'center' }}>
          Are you sure you want to cancel this order?
        </h4>
        <div style={buttonWrapperStyle}>
          <Button
            text="Yes"
            type={ButtonTypes.Danger}
            onClick={onCancelOrder}
            dataProps={{ style: { width: '100%' } }}
          />
          <Button
            text="No"
            onClick={onCloseModal}
            dataProps={{ style: { width: '100%' } }}
          />
        </div>
      </Box>
    </Modal>
  );
}
