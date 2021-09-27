import React from 'react';
import { useSelector } from 'react-redux';
import Product from '../Product/Product';
import './Home.scss';

const Home = () => {
  const productList = useSelector(store => store.product.products);
  return (
    <div className="home">
      <div className="home__row">
        {productList.length > 0 ? (
          productList.map(product => (
            <Product
              key={product.name}
              image={product.image}
              title={product.name}
              price={product.price}
            />
          ))
        ) : (
          <div>No Products Available now</div>
        )}
      </div>
    </div>
  );
};

export default Home;
