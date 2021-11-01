import * as aT from '../actionTypes/productActionTypes';
import {
  getProductListApi,
  getProductCategoriesApi,
  createProductApi,
  updateProductApi,
  getProductApi,
} from '../../common/api';
import { NotifyMe } from 'components/common/NotifyMe/NotifyMe';
import { getSearchStringFromObject } from 'utils/utils';
import { setLoaderFalse, setLoaderTrue } from './authActions';

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

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const getProducts = ({ query, cb } = { query: {}, cb: () => {} }) => {
  let searchObj = { all: true };
  if (query) {
    searchObj = { ...searchObj, ...query };
  }
  const searchString = getSearchStringFromObject({ ...searchObj });
  return dispatch => {
    dispatch(setLoaderTrue());
    getProductListApi(searchString)
      .then(res => {
        const { status, data, msg } = res;
        dispatch(setLoaderFalse());
        if (!status) throw msg;
        dispatch(setProductsList(data));
      })
      .catch(err => {
        NotifyMe('error', `${err}!`);
        console.log(err);
      })
      .finally(() => {
        if (cb) cb();
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

function isProductDetailsComplete(data) {
  if (
    !data.name ||
    !data.price ||
    !data.stock ||
    !data.image ||
    !data.category ||
    !data.description
  )
    return false;
  return true;
}

export const createProduct = ({ requestData, onSuccess, onFailure }) => {
  return dispatch => {
    if (!isProductDetailsComplete(requestData)) {
      NotifyMe('error', 'Cannot create product with Incomplete details');
      onFailure();
      return;
    }
    createProductApi(requestData)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        onSuccess();
        const productData = { ...data };
        dispatch(setNewProduct(productData));
        NotifyMe('success', 'Product added sucessfully');
      })
      .catch(err => {
        NotifyMe('error', `${err}!`);
        onFailure();
        console.log(err);
      });
  };
};

export const updateProduct = ({
  product_id,
  requestData,
  onSuccess,
  onFailure,
}) => {
  return dispatch => {
    if (!isProductDetailsComplete(requestData)) {
      NotifyMe('error', 'Cannot update product with Incomplete details');
      onFailure();
      return;
    }
    updateProductApi(product_id, requestData)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        onSuccess();
        const productData = { ...data };
        dispatch(setUpdatedProduct(productData));
      })
      .catch(err => {
        NotifyMe('error', `${err}!`);
        onFailure();
        console.log(err);
      });
  };
};

export const getProductItem = ({ id, onSuccess, onFailure }) => {
  return () => {
    getProductApi(id)
      .then(res => {
        const { status, data, msg } = res;
        if (!status) throw msg;
        if (onSuccess) onSuccess(data);
      })
      .catch(err => {
        NotifyMe('error', `${err}!`);
        onFailure();
        console.log(err);
      });
  };
};
