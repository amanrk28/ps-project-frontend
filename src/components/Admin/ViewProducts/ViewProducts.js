import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Input from 'components/common/Input/Input';
import Filter from 'components/Filter/Filter';
import ListTable from 'components/common/ListTable/ListTable';
import * as actions from 'store/actions/productActions';
import { queryStringify } from 'utils/utils';
import './ViewProducts.scss';

const PRODUCT_TABLE_HEADERS = [
  { name: '#', dataname: 'id' },
  { name: 'Image', dataname: 'image' },
  { name: 'Name', dataname: 'name' },
  { name: 'Price / unit', dataname: 'price' },
  { name: 'Stock', dataname: 'stock' },
  { name: 'Category', dataname: 'category' },
  { name: 'Description', dataname: 'description' },
  { name: '', dataname: 'edit' },
];

class ViewProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      category: 'all',
      isLoading: false,
    };
  }

  componentDidMount = () => {
    const { actions, router } = this.props;
    let query = {};
    if (router.location?.query?.search) {
      query.search = router.location.query.search;
    }
    if (
      router.location.query?.category &&
      router.location.query.category !== 'all'
    ) {
      query.category = router.location.query.category;
    }
    this.setState({ ...query });
    actions.getProducts({ query });
  };

  onEditProduct = id => {
    const { match, history } = this.props;
    history.push({ pathname: `${match.url}/${id}/edit`, hash: 'edit' });
  };

  onChangeFilter = e => {
    const { history, actions, router } = this.props;
    let { value } = e.target;
    const key = e.currentTarget.getAttribute('data-name');
    const query = { ...router.location.query, [key]: value };
    this.setState({ ...this.state, ...query });
    for (const k in query) {
      if (query.hasOwnProperty(k) && !query[k]) delete query[k];
      if (k === 'category' && query[k] === 'all') delete query[k];
    }
    history.push({ search: queryStringify(query) });
    this.setState({ isLoading: true });
    const onCb = () => {
      this.setState({ isLoading: false });
    };
    actions.getProducts({ query, cb: onCb });
  };

  getCategoryFromId = product => {
    const { productCategories } = this.props;
    const category = productCategories.find(x => x.id === product.category);
    if (category) return category.name;
    return product.category;
  };

  renderListItem = ({ idx, dataItem, item }) => {
    return (
      <div className={item.dataname} key={item.dataname}>
        {item.dataname === 'id' && idx + 1}
        {item.dataname === 'image' && (
          <img src={dataItem.image} alt={dataItem.name} />
        )}
        {item.dataname === 'edit' && (
          <div onClick={() => this.onEditProduct(dataItem.id)}>
            <ModeEditIcon />
          </div>
        )}
        {item.dataname === 'category' && (
          <p>{this.getCategoryFromId(dataItem)}</p>
        )}
        {['name', 'price', 'stock', 'description'].includes(item.dataname) && (
          <p>
            {item.dataname === 'price' && <span>&#8377;</span>}
            {dataItem[item.dataname]}
          </p>
        )}
      </div>
    );
  };

  render() {
    const { productList, productCategories } = this.props;
    const { search, category, isLoading } = this.state;
    return (
      <div className="viewProducts-wrapper">
        <div className="viewProducts-header-wrapper center">
          <div className="viewProducts-header">
            Products ({productList.length})
          </div>
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
        <ListTable
          headers={PRODUCT_TABLE_HEADERS}
          dataList={productList}
          isLoading={isLoading}
          renderListItem={this.renderListItem}
          tableFor="Products"
          customTableWrapper="customTableWrapper"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router,
  productList: state.product.products,
  productCategories: state.product.product_categories,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewProducts));
