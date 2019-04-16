import {expectSaga} from "redux-saga-test-plan";
import {call} from 'redux-saga/effects';
import {throwError} from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import {getProductsPerPage, getNumberOfProducts, searchProducts} from "../../api";
import {getProductsPerPageSaga, getNumberOfProductsSaga, searchProductsSaga} from "./index";
import {rootReducer, initialState} from "../reducers";
import * as actionTypes from '../../constants/action-types';

it("getProductsPerPageSaga should fetch products", () => {
  const products = [{
    "product_id": 1,
    "name": "Test Product"
  }];
  const action = {payload: {activePage: 1, pageLength: 1}};

  return expectSaga(getProductsPerPageSaga, action)
    .provide([[call(getProductsPerPage, action.payload), products]])
    .withReducer(rootReducer)
    .hasFinalState(Object.assign({}, initialState, {
      products
    }))
    .run(false);
});

it("getProductsPerPageSaga should set error state on store when error thrown", () => {
  const action = {payload: {activePage: 1, pageLength: 1}};
  const error = new Error('error');

  return expectSaga(getProductsPerPageSaga, action)
    .provide([[matchers.call.fn(getProductsPerPage), throwError(error)]])
    .put({type: actionTypes.GET_PRODUCTS_ERROR})
    .withReducer(rootReducer)
    .withState(Object.assign({}, initialState, {
      productsLoadError: false,
      numberOfProducts: 10,
      products:[{test: 'object'}]
    }))
    .hasFinalState(Object.assign({}, initialState, {
      productsLoadError: true,
      numberOfProducts: 0,
      products: []
    }))
    .run();
});

it("getNumberOfProductsSaga should set error state on store when error thrown", () => {
  const numberOfProducts = 0;

  return expectSaga(getNumberOfProductsSaga)
    .provide([[call(getNumberOfProducts), numberOfProducts]])
    .put({type: actionTypes.GET_PRODUCTS_ERROR})
    .withReducer(rootReducer)
    .withState(Object.assign({}, initialState, {
      productsLoadError: false,
      numberOfProducts: 10,
      products:[{test: 'object'}]
    }))
    .hasFinalState(Object.assign({}, initialState, {
      productsLoadError: true,
      numberOfProducts,
      products: []
    }))
    .run();
});

it("getNumberOfProductsSaga should fetch correct number of products", () => {
  const numberOfProducts = 99;
  const action = {
    type: actionTypes.GET_NUMBER_OF_PRODUCTS,
    payload: {searchQuery: 'test'}
  };

  return expectSaga(getNumberOfProductsSaga, action)
    .provide([[call(getNumberOfProducts, action.payload), numberOfProducts]])
    .withReducer(rootReducer)
    .hasFinalState(Object.assign({}, initialState, {
      numberOfProducts
    }))
    .run();
});

it("searchProductsSaga should set setSearchQuery query on store", () => {
  const action = {payload: 'test query'};

  return expectSaga(searchProductsSaga, action)
    .withReducer(rootReducer)
    .hasFinalState(Object.assign({}, initialState, {
      searchQuery: action.payload
    }))
    .run(false);
});