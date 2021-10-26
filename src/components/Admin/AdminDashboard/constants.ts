import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const paths = {
  viewProducts: '/admin/products',
  addProduct: '/admin/products/add',
  viewOrders: '/admin/orders',
};

export enum actionIds {
  ViewOrders = 'view_orders',
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
];

export { adminActions };
