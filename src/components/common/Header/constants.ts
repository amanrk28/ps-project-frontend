export const HEADER_ITEMS = [
  { name: 'Home', url: '/', dataname: 'home' },
  { name: 'Your Account', url: '/account', dataname: 'account' },
  { name: 'Your Orders', url: '/orders', dataname: 'orders' },
  { name: 'Cart', url: '/cart', dataname: 'cart' },
];

export const drawerStyle = {
  width: 0.6,
  flexShrink: 0,
  [`.MuiDrawer-paper`]: {
    width: 0.6,
    boxSizing: 'border-box',
    padding: '2rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    bgcolor: 'var(--yellow-primary)',
    boxShadow: '0 0 16px #666',
  },
};

export const iconStyle = {
  width: 80,
  p: 2,
  color: 'white',
};
