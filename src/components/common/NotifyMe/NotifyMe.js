import { toast } from 'react-toastify';
import './NotifyMe.scss';

export const NotifyMe = (status, msg, position = 'top-right') => {
  const styleObj = {
    position,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    pauseOnFocusLoss: true,
  };
  if (status === 'success') return toast.success(msg, styleObj);
  else if (status === 'info') return toast.info(msg, styleObj);
  else if (status === 'warning') return toast.warn(msg, styleObj);
  else if (status === 'error') return toast.error(msg, styleObj);
  else return toast.info(msg, styleObj);
};
