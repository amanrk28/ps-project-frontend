import React from 'react';
import { Link } from 'react-router-dom';
import PlusMinusBtn from 'components/common/PlusMinusBtn/PlusMinusBtn';
import Button from 'components/common/Button/Button';
import './Product.scss';

interface ProductFields {
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
}

interface CartItemFields {
  product_id: number;
  quantity: number;
}

interface ProductProps {
  product: ProductFields;
  cartItems: CartItemFields[];
  cartItemIds: number[];
  onClickAddToCart: (id: number) => void;
  updateCartCount: (id: number, quantity: number, stock: number) => void;
}

const Product = ({
  product: { id, image, name, price, stock },
  cartItems,
  cartItemIds,
  onClickAddToCart,
  updateCartCount,
}: ProductProps) => {
  const getProductCount = () => {
    if (cartItems && cartItems.length > 0) {
      const item = cartItems.find(x => x.product_id === id);
      if (item) return item.quantity;
    }
    return 0;
  };

  return (
    <div className="product">
      <Link to={`/products/${id}`}>
        <div className="product-image__container">
          <img src={image} alt={name} loading="lazy" />
        </div>
        <div className="product__info">
          <p className="product__title">{name}</p>
          <p className="product__price">&#8377; {price}</p>
        </div>
      </Link>
      <div className="center">
        {cartItemIds && cartItemIds.includes(id) ? (
          <PlusMinusBtn
            count={getProductCount()}
            updateCartCount={quantity => updateCartCount(id, quantity, stock)}
          />
        ) : (
          <Button text="Add to Cart" onClick={() => onClickAddToCart(id)} />
        )}
      </div>
    </div>
  );
};

export default Product;
