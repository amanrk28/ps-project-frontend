import React, { Component } from 'react';
import Product from '../Product/Product';
import './Home.scss';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { productList } = this.props;
    return (
      <div className="home">
        <div className="home__row">
          {productList.map(product => (
            <Product
              image={product.image}
              title={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  productList: state.product.products,
});

export default connect(mapStateToProps, null)(Home);
