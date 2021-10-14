import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isMobile } from 'react-device-detect';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import ImageIcon from '@mui/icons-material/Image';
import DropdownInput from 'components/common/DropdownInput/DropdownInput';
import Button from 'components/common/Button/Button';
import Input from 'components/common/Input/Input';
import * as actions from 'store/actions/productActions';
import './AddUpdateProduct.scss';
import FileInput from 'components/common/FileInput/FileInput';

const PRODUCT_FIELDS = [
  { name: 'Product Name', dataname: 'name', type: 'text' },
  { name: 'Price / unit', dataname: 'price', type: 'number' },
  { name: 'Stock', dataname: 'stock', type: 'number' },
];

class AddUpdateProduct extends Component {
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
      isLoading: false,
    };
  }

  componentDidMount = () => {
    const { match, location, productList } = this.props;
    if (location.hash !== '#edit') return;
    const { id } = match.params;
    this.setState({ isNewProduct: false });
    const product = productList.find(
      x => parseInt(x.id, 10) === parseInt(id, 10)
    );
    if (product) {
      const { name, description, price, stock, image, category } = product;
      this.setState({
        name,
        description,
        price,
        stock,
        category,
        image,
        id,
      });
    }
  };

  onChange = e => {
    const key = e.currentTarget.getAttribute('data-name');
    let { value } = e.target;
    if (['price', 'stock'].includes(key)) value = parseInt(value, 10);
    this.setState({ [key]: value });
  };

  onClickBack = () => {
    const { history } = this.props;
    history.push('/admin/products');
  };
  onChangeImage = url => {
    if (url) this.setState({ image: url });
  };

  onAddProduct = () => {
    const { actions, history } = this.props;
    const { name, price, stock, image, category, description } = this.state;
    const requestData = {
      name,
      price,
      stock,
      image,
      category,
      description,
    };
    this.setState({ isLoading: true });
    const onCb = () => {
      this.setState({ isLoading: false });
      history.push('/admin/products');
    };
    actions.createProduct({ requestData, cb: onCb });
  };

  onUpdateProduct = () => {
    const { actions, history } = this.props;
    const { name, price, stock, image, category, description, id } = this.state;
    const requestData = {
      name,
      price,
      stock,
      image,
      category,
      description,
    };
    this.setState({ isLoading: true });
    const onCb = () => {
      this.setState({ isLoading: false });
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
    const { description, category, isNewProduct, image, isLoading } =
      this.state;
    const { productsCategories, toggleSidebar } = this.props;

    return (
      <div className="addProduct-wrapper">
        <div className="addProduct-header-wrapper center">
          {!isNewProduct && (
            <div className="goBack center" onClick={this.onClickBack}>
              <ArrowBackIcon />
            </div>
          )}
          {isNewProduct && isMobile && (
            <div className="menuIcon center" onClick={toggleSidebar}>
              <MenuIcon />
            </div>
          )}
          <div className="addProduct-header">
            {isNewProduct ? 'Add ' : 'Edit '}Product
          </div>
        </div>
        <div className="addProduct-fields-container">
          <div>
            <div className="addProduct-image-container center">
              {image ? <img src={image} /> : <ImageIcon />}
            </div>
            <div className="addProduct-input-container">
              <p>Product Image</p>
              <FileInput onChange={this.onChangeImage} />
            </div>
          </div>
          {PRODUCT_FIELDS.map(field => (
            <div className="addProduct-input-container" key={field.dataname}>
              <Input
                label={field.name}
                dataname={field.dataname}
                placeholder={field.name}
                onChange={this.onChange}
                value={this.state[field.dataname]}
                inputClass="addProduct-input"
                type={field.type}
              />
            </div>
          ))}
          <div className="addProduct-dropdown-container">
            <p>Product Category</p>
            <DropdownInput
              options={productsCategories}
              labelPlaceholder="Category"
              onChange={this.onChange}
              value={category}
              dataname="category"
            />
          </div>
          <div className="addProduct-textarea-container">
            <p>Product Description</p>
            <textarea
              onChange={this.onChange}
              value={description}
              maxLength="250"
              rows="4"
              placeholder="Max. 250 characters"
              data-name="description"
            />
          </div>
          <Button
            type="primary"
            text={isNewProduct ? 'Add' : 'Update'}
            onClick={this.onClickSubmit}
            isLoading={isLoading}
            dataProps={{ style: { fontWeight: 600 } }}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateProduct);
