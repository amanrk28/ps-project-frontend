import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DropdownInput from 'components/common/DropdownInput/DropdownInput';
import Button from 'components/common/Button/Button';
import Input from 'components/common/Input/Input';
import * as actions from 'store/actions/productActions';
import './AddProduct.scss';

const PRODUCT_FIELDS = [
  { name: 'Product Name', dataname: 'name', type: 'text' },
  { name: 'Price / unit', dataname: 'price', type: 'number' },
  { name: 'Stock', dataname: 'stock', type: 'number' },
];

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      description: '',
      image: '',
      stock: '',
      price: '',
      category: '',
      isNewProduct: true,
    };
  }

  componentDidMount = () => {
    const { match, location, productList } = this.props;
    if (location.hash !== '#edit') return;
    const { id } = match.params;
    this.setState({ isNewProduct: false });
    console.log('productList', productList);
    const product = productList.filter(
      x => parseInt(x.id, 10) === parseInt(id, 10)
    );
    console.log(product);
    if (product.length) {
      const { name, description, price, stock, image, category } = product[0];
      this.setState({ name, description, price, stock, image, category, id });
    }
  };

  onChange = (e, dataname) => {
    let { value } = e.target;
    if (['price', 'stock'].includes(dataname)) value = parseInt(value, 10);
    this.setState({ [dataname]: value });
  };

  onClickBack = () => this.props.history.goBack();

  onChangeImage = e => {
    console.log(e.target);
  };

  onAddProduct = () => {
    console.log('add');
  };

  onUpdateProduct = () => {
    const { actions, history } = this.props;
    const { name, price, stock, image, category, description, id } = this.state;
    const requestData = { name, price, stock, image, category, description };
    const onCb = () => {
      history.goBack();
    };
    actions.updateProduct({ product_id: id, requestData, cb: onCb });
  };

  onClickSubmit = () => {
    const { isNewProduct } = this.state;
    if (isNewProduct) this.onAddProduct();
    else this.onUpdateProduct();
  };

  render() {
    const { description, category, isNewProduct } = this.state;
    const { productsCategories } = this.props;

    return (
      <div className="addProduct-wrapper">
        <div className="addProduct-header-wrapper center">
          <div className="goBack center" onClick={this.onClickBack}>
            <ArrowBackIcon />
          </div>
          <div className="addProduct-header">
            {isNewProduct ? 'Add ' : 'Edit '}Product
          </div>
        </div>
        <div className="addProduct-fields-container center">
          {PRODUCT_FIELDS.map(field => (
            <div className="inputField-container" key={field.dataname}>
              <p>{field.name}</p>
              <Input
                dataname={field.dataname}
                placeholder={field.name}
                onChange={e => this.onChange(e, field.dataname)}
                value={this.state[field.dataname]}
                inputClass="addProduct-input"
                type={field.type}
              />
            </div>
          ))}
          <div className="dropdownInput">
            <p>Product Category</p>
            <DropdownInput
              options={productsCategories}
              labelPlaceholder="Category"
              onChange={e => this.onChange(e, 'category')}
              value={category}
              dataname="category"
              dropdownClass="dropdownClass"
              dropdownPlaceholderClass="dropdownPlaceholderClass"
              dropdownBoxClass="dropdownBoxClass"
              dropDownItemClass="dropDownItemClass"
              dropDownItemActiveClass="dropDownItemActiveClass"
            />
          </div>
          <div className="textareaInput">
            <p>Product Description</p>
            <textarea
              onChange={e => this.onChange(e, 'description')}
              value={description}
              maxLength="250"
              rows="4"
              placeholder="Max. 250 characters"
            />
          </div>
          <div className="imageInput">
            <p>Product Image</p>
            <input type="file" onChange={this.onChangeImage} />
          </div>
          <Button type="primary" onClick={this.onClickSubmit}>
            {isNewProduct ? 'Add' : 'Update'}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  productsCategories: state.product.product_categories,
  productList: state.product.products,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
