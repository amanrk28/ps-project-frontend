import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import './ViewProducts.scss';

const PRODUCT_TABLE_HEADERS = [
  { name: 'Image', dataname: 'image' },
  { name: 'Name', dataname: 'name' },
  { name: 'Price / unit', dataname: 'price' },
  { name: 'Stock', dataname: 'stock' },
  { name: 'Category', dataname: 'category' },
  { name: 'Description', dataname: 'description' },
  { name: 'Edit', dataname: 'edit' },
];

class ViewProducts extends Component {
  onClickBack = () => {
    this.props.history.push('/admin');
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
                className={`tableHeader ${item.dataname}`}
                key={item.dataname}
              >
                {item.name}
              </div>
            ))}
          </li>
          {productList.map(product => (
            <li key={product.id}>
              {PRODUCT_TABLE_HEADERS.map(item => (
                <div className={item.dataname} key={item.dataname}>
                  {item.dataname === 'image' && (
                    <img src={product.image} alt={product.name} />
                  )}
                  {item.dataname === 'edit' && (
                    <div onClick={() => this.onEditProduct(product.id)}>
                      <ModeEditIcon />
                    </div>
                  )}
                  {item.dataname === 'category' && (
                    <p>
                      {productCategories.filter(
                        x => x.id === product.category
                      )[0].name || product.category}
                    </p>
                  )}
                  {!['image', 'category', 'edit'].includes(item.dataname) && (
                    <p>
                      {item.dataname === 'price' && <span>&#8377;</span>}
                      {product[item.dataname]}
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
