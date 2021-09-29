import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Input from 'components/common/Input/Input';
import * as actions from 'store/actions/productActions';
import { queryStringify } from 'utils/utils';
import Filter from 'components/Filter/Filter';
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
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      category: 'all',
    };
  }

  componentDidMount = () => {
    const { actions, location } = this.props;
    let query = {};
    if (location?.query?.search) {
      query.search = location.query.search;
    }
    if (location?.query?.category && location.query.category !== 'all') {
      query.category = location.query.category;
    }
    this.setState({ ...query });
    actions.getProducts(query);
  };

  onClickBack = () => {
    this.props.history.push('/admin');
  };

  onEditProduct = id => {
    const { match, history } = this.props;
    history.push({ pathname: `${match.url}/${id}/edit`, hash: 'edit' });
  };

  onChangeFilter = e => {
    const { history, location, actions } = this.props;
    let { value } = e.target;
    const key = e.currentTarget.getAttribute('data-name');
    const query = { ...location.query, [key]: value };
    this.setState({ ...this.state, ...query });
    for (const k in query) {
      if (query.hasOwnProperty(k) && !query[k]) delete query[k];
      if (k === 'category' && query[k] === 'all') delete query[k];
    }
    history.push({ search: queryStringify(query) });
    actions.getProducts(query);
  };

  getCategoryFromId = product => {
    const { productCategories } = this.props;
    const category = productCategories.find(x => x.id === product.category);
    if (category) return category.name;
    return product.category;
  };

  render() {
    const { productList, productCategories } = this.props;
    const { search, category } = this.state;
    return (
      <div className="viewProducts-wrapper">
        <div className="viewProducts-header-wrapper center">
          <div className="goBack center" onClick={this.onClickBack}>
            <ArrowBackIcon />
          </div>
          <div className="viewProducts-header">Products</div>
        </div>
        <div className="viewProducts-topbar center">
          <div className="viewProducts-searchBar">
            <Input
              label="Search"
              dataname="search"
              value={search}
              onChange={this.onChangeFilter}
              placeholder="Search By Product Name"
            />
          </div>
          <div className="viewProducts-filters-container">
            <Filter
              filterName="Category"
              filterOptions={productCategories}
              value={category}
              onChange={this.onChangeFilter}
              dataname="category"
            />
          </div>
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
          {productList.length > 0 ? (
            productList.map(product => (
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
                      <p>{this.getCategoryFromId(product)}</p>
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
            ))
          ) : (
            <div className="tableEmpty center">No Products Found</div>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.router.location,
  productList: state.product.products,
  productCategories: state.product.product_categories,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProducts);
