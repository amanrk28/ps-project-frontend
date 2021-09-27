import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import './ViewProducts.scss';

const PRODUCT_TABLE_HEADERS = [
  { title: 'Image', className: 'image' },
  { title: 'Name', className: 'name' },
  { title: 'Price / unit', className: 'price' },
  { title: 'Stock', className: 'stock' },
  { title: 'Category', className: 'category' },
  { title: 'Description', className: 'description' },
  { title: 'Edit', className: 'edit' },
];

class ViewProducts extends Component {
  onClickBack = () => {
    this.props.history.goBack();
  };

  onEditProduct = id => {
    const { match, history } = this.props;
    history.push({ pathname: `${match.url}/${id}/edit`, hash: 'edit' });
  };

  render() {
    const { productList, productCategories } = this.props;
    return (
      <div className="viewProducts-wrapper">
        <div className="viewProducts-header-wrapper center">
          <div className="goBack center" onClick={this.onClickBack}>
            <ArrowBackIcon />
          </div>
          <div className="viewProducts-header">Products</div>
        </div>
        <ul className="table-wrapper">
          <li>
            {PRODUCT_TABLE_HEADERS.map(item => (
              <div
                className={`tableHeader ${item.className}`}
                key={item.className}
              >
                {item.title}
              </div>
            ))}
          </li>
          {productList.map(product => (
            <li key={product.id}>
              {PRODUCT_TABLE_HEADERS.map(item => (
                <div className={item.className} key={item.className}>
                  {item.className === 'image' && (
                    <img src={product.image} alt={product.name} />
                  )}
                  {item.className === 'edit' && (
                    <div onClick={() => this.onEditProduct(product.id)}>
                      <ModeEditIcon />
                    </div>
                  )}
                  {item.className === 'category' && (
                    <p>
                      {productCategories.filter(
                        x => x.id === product.category
                      )[0].name || product.category}
                    </p>
                  )}
                  {item.className !== 'image' &&
                    item.className !== 'category' &&
                    item.className !== 'edit' && (
                      <p>
                        {item.className === 'price' && <span>&#8377;</span>}
                        {product[item.className]}
                      </p>
                    )}
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  productList: state.product.products,
  productCategories: state.product.product_categories,
});

export default connect(mapStateToProps, null)(ViewProducts);
