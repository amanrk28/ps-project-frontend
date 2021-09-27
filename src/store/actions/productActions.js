import * as aT from '../actionTypes/productActionTypes';
import {
  getProductsApi,
  getProductCategoriesApi,
  createProductApi,
  updateProductApi,
} from '../../common/api';
import { NotifyMe } from 'components/common/NotifyMe/NotifyMe';

const setProductsList = data => ({
  type: aT.SET_PRODUCTS,
  data,
});

const setProductCategoriesList = data => ({
  type: aT.SET_PRODUCT_CATEGORIES,
  data,
});

const setNewProduct = data => ({
  type: aT.SET_NEW_PRODUCT,
  data,
});

const setUpdatedProduct = data => ({
  type: aT.SET_UPDATED_PRODUCT,
  data,
});

export const getProducts = () => {
  return dispatch => {
    getProductsApi()
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        dispatch(setProductsList(data));
      })
      .catch(err => {
        NotifyMe('error', `${err}!`);
        console.log(err);
      });
  };
};

export const getProductCategories = () => {
  return dispatch => {
    getProductCategoriesApi()
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        dispatch(setProductCategoriesList(data.categories));
      })
      .catch(err => {
        NotifyMe('error', `${err}!`);
        console.log(err);
      });
  };
};

const getFieldsForProduct = data => ({
  id: data.id,
  name: data.name,
  price: data.price,
  stock: data.stock,
  image: data.image,
  description: data.description,
  is_available: data.is_available,
  category: data.category,
  added_by: data.added_by,
});

export const createProduct = ({ requestData, cb }) => {
  return dispatch => {
    if (
      !requestData.name ||
      !requestData.price ||
      !requestData.stock ||
      !requestData.image ||
      !requestData.description
    )
      return NotifyMe('error', 'Cannot create product with Incomplete details');
    createProductApi(requestData)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        const productData = getFieldsForProduct(data);
        dispatch(setNewProduct(productData));
        if (cb) cb();
      })
      .catch(err => {
        NotifyMe('error', `${err}!`);
        console.log(err);
      });
  };
};

export const updateProduct = ({ product_id, requestData, cb }) => {
  return dispatch => {
    updateProductApi(product_id, requestData)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        const productData = getFieldsForProduct(data);
        dispatch(setUpdatedProduct(productData));
        if (cb) cb();
      })
      .catch(err => {
        NotifyMe('error', `${err}!`);
        console.log(err);
      });
  };
};
