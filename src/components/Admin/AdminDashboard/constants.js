import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
const productActionId = {
  viewProduct: 'view_product',
  addProduct: 'add_product',
};

const adminProductActions = [
  {
    id: productActionId.viewProduct,
    name: 'All Products',
    icon: ListAltIcon,
  },
  {
    id: productActionId.addProduct,
    name: 'Add Product',
    icon: AddIcon,
  },
];

const orderActionId = {
  viewOrders: 'view_orders',
  updateOrderStatus: 'update_order_status',
};

const adminOrderActions = [
  {
    id: orderActionId.viewOrders,
    name: 'All Orders',
    icon: AssignmentIcon,
  },
  {
    id: orderActionId.updateOrderStatus,
    name: 'Update Order Status',
    icon: ModeEditIcon,
  },
];

export {
  adminOrderActions,
  adminProductActions,
  productActionId,
  orderActionId,
};
