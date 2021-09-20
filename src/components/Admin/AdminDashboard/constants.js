import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const productActionId = {
  viewProduct: 'view_product',
  addProduct: 'add_product',
  updateProduct: 'update_product',
};

const adminProductActions = [
  {
    id: productActionId.viewProduct,
    name: 'View All Products',
    icon: FormatListBulletedIcon,
  },
  {
    id: productActionId.addProduct,
    name: 'Add Product',
    icon: AddIcon,
  },
  {
    id: productActionId.updateProduct,
    name: 'Update Product',
    icon: ModeEditIcon,
  },
];

const orderActionId = {
  viewOrders: 'view_orders',
  updateOrderStatus: 'update_order_status',
};

const adminOrderActions = [
  {
    id: orderActionId.viewOrders,
    name: 'View All Orders',
    icon: FormatListBulletedIcon,
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
