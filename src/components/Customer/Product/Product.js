import React from 'react';
import Button from '../../common/Button/Button';
import './Product.scss';

const Product = ({ image, title, price }) => {
  return (
    <div className="product">
      <div className="product-image__container">
        <img src={image} alt={title} />
      </div>
      <div className="product__info">
        <p className="product__title">{title}</p>
        <p className="product__price">
          <span>&#8377;&nbsp;</span>
          <strong>{price}</strong>
        </p>
      </div>
      <div className="center">
        <Button text="Add to Cart" />
      </div>
    </div>
  );
};

export default Product;
