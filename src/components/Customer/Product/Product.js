import React from 'react';
import PlusMinusBtn from 'components/common/PlusMinusBtn/PlusMinusBtn';
import Button from 'components/common/Button/Button';
import './Product.scss';

const Product = ({
  product: { id, image, name, price },
  cartItems,
  cartItemIds,
  onClickAddToCart,
  updateCartCount,
}) => {
  const getProductCount = () => {
    if (cartItems && cartItems.length > 0) {
      const item = cartItems.find(x => x.product_id === id);
      if (item) return item.quantity;
    }
  };

  return (
    <div className="product">
      <div className="product-image__container">
        <img src={image} alt={name} loading="lazy" />
      </div>
      <div className="product__info">
        <p className="product__title">{name}</p>
        <p className="product__price">&#8377; {price}</p>
      </div>
      <div className="center">
        {cartItemIds && cartItemIds.includes(id) ? (
          <PlusMinusBtn
            count={getProductCount()}
            updateCartCount={quantity => updateCartCount(id, quantity)}
          />
        ) : (
          <Button text="Add to Cart" onClick={() => onClickAddToCart(id)} />
        )}
      </div>
    </div>
  );
};

export default Product;
