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
      searchValue: '',
      categoryFilter: 'all',
    };
  }

  componentDidMount = () => {
    const { actions, location } = this.props;
    let query = { searchValue: '', categoryFilter: '' };
    if (location?.query?.search) {
      query.searchValue = location.query.search;
      this.setState({ searchValue: query.searchValue });
    }
    if (location?.query?.category) {
      query.categoryFilter = location.query.category;
      this.setState({ categoryFilter: query.categoryFilter });
    }
    actions.getProducts(query);
  };

  onClickBack = () => {
    this.props.history.push('/admin');
  };

  onEditProduct = id => {
    const { match, history } = this.props;
    history.push({ pathname: `${match.url}/${id}/edit`, hash: 'edit' });
  };

  onChangeSearchValue = e => {
    const { history, location, actions } = this.props;
    let { value } = e.target;
    let query = { ...location.query, search: value };
    const searchValue = value;
    if (value === '') {
      delete query.search;
    }
    history.push({ search: queryStringify(query) });
    actions.getProducts({ searchValue });
    this.setState({ searchValue });
  };

  onChangeCategoryFilter = e => {
    const { actions, history, location } = this.props;
    let { value } = e.target;
    let query = { ...location.query, category: value };
    if (value === 'all') {
      delete query.category;
    }
    history.push({ search: queryStringify(query) });
    actions.getProducts({ categoryFilter: value });
    this.setState({ categoryFilter: value });
  };

  render() {
    const { productList, productCategories } = this.props;
    const { searchValue, categoryFilter } = this.state;
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
              dataname="searchValue"
              value={searchValue}
              onChange={this.onChangeSearchValue}
              placeholder="Search By Product Name"
            />
          </div>
          <div className="viewProducts-filters-container">
            <Filter
              filterName="Category"
              filterOptions={productCategories}
              value={categoryFilter}
              onChange={this.onChangeCategoryFilter}
              dataname="categoryFilter"
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
