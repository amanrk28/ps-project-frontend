import React, { lazy, Suspense } from 'react';
import { isMobile } from 'react-device-detect';
import Loading from 'components/common/Loading/Loading';
import Header from '../components/common/Header/Header';

const Cart = lazy(() => import('components/Customer/Cart/Cart'));
const CartMobile = lazy(() =>
  import('components/Customer/CartMobile/CartMobile')
);

const CartPage = props => (
  <>
    <Header enableSearch />
    <Suspense fallback={<Loading fullLoader />}>
      {isMobile ? <CartMobile {...props} /> : <Cart {...props} />}
    </Suspense>
  </>
);
export default CartPage;
