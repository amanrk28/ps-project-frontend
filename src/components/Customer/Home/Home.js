import React from 'react';
import { useSelector } from 'react-redux';
import Product from '../Product/Product';
import './Home.scss';

const Home = () => {
  const productList = useSelector(store => store.product.products);
  return (
    <div className="home">
      {productList.length > 0 ? (
        <div className="home__row">
          {productList.map(product => (
            <Product
              key={product.name}
              image={product.image}
              title={product.name}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <div className="home__empty_products center">
          <p>No Products available right now!</p>
          <p>Please Try again later</p>
        </div>
      )}
    </div>
  );
};

export default Home;
