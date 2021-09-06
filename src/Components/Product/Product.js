import React from 'react'
import Button from '../Button/Button'
import './Product.scss'

function Product ({image, title, price}) {
    return (
        <div className="product">
            <img src={image} />
            <div className="product__info">
                <p className="product__title">{title}</p>
                <p className="product__price">
                    <p>&#8377;</p>
                    <strong>{price}</strong>
                </p>
            </div>
            <Button />
        </div>
    )
}

export default Product
