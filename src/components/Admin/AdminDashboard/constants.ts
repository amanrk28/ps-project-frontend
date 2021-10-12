import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const paths = {
  viewProducts: '/admin/products',
  addProduct: '/admin/products/add',
  viewOrders: '/admin/orders',
};

export enum actionIds {
  ViewOrders = 'view_orders',
  UpdateOrderStatus = 'update_order_status',
  ViewProduct = 'view_product',
  AddProduct = 'add_product',
}

const adminActions = [
  {
    id: actionIds.ViewProduct,
    name: 'Products',
    icon: ListAltIcon,
  },
  {
    id: actionIds.AddProduct,
    name: 'Add Product',
    icon: AddIcon,
  },
  {
    id: actionIds.ViewOrders,
    name: 'Orders',
    icon: AssignmentIcon,
  },
  {
    id: actionIds.UpdateOrderStatus,
    name: 'Update Order Status',
    icon: ModeEditIcon,
  },
];

export { adminActions };
