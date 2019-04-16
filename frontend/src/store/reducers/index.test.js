import * as actionTypes from '../../constants/action-types';
import {rootReducer, initialState} from "./index";

describe('root reducer', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual(initialState)
  });

  it('should handle GET_PRODUCTS_SUCCESS', () => {
    const products = [{
      "product_id": 1,
      "name": "Arc d'Triomphe",
      "description": "This beautiful and iconic T-shirt will no doubt lead you to your own triumph.",
      "price": 14.99,
      "discounted_price": 0,
      "image": "arc-d-triomphe.gif",
      "image_2": "arc-d-triomphe-2.gif",
      "thumbnail": "arc-d-triomphe-thumbnail.gif",
      "display": 0
    }];

    expect(
      rootReducer(initialState, {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        payload: products
      })
    ).toEqual(Object.assign({}, initialState, {products}));
  });

  it('should handle GET_PRODUCTS_ERROR', () => {
    expect(
      rootReducer(initialState, {
        type: actionTypes.GET_PRODUCTS_ERROR
      })
    ).toEqual(Object.assign({}, initialState, {
      productsLoadError: true
    }));
  });

  it('should handle GET_NUMBER_OF_PRODUCTS_SUCCESS', () => {
    expect(
      rootReducer(initialState, {
        type: actionTypes.GET_NUMBER_OF_PRODUCTS_SUCCESS,
        payload: 1
      })
    ).toEqual(Object.assign({}, initialState, {
      numberOfProducts: 1
    }));
  });

  it('should handle SET_ACTIVE_CATEGORY', () => {
    expect(
      rootReducer(initialState, {
        type: actionTypes.SET_ACTIVE_CATEGORY,
        payload: 1
      })
    ).toEqual(Object.assign({}, initialState, {
      activeCategory: 1
    }));
  });

  it('should handle SET_ACTIVE_DEPARTMENT', () => {
    expect(
      rootReducer(initialState, {
        type: actionTypes.SET_ACTIVE_DEPARTMENT,
        payload: 1
      })
    ).toEqual(Object.assign({}, initialState, {
      activeDepartment: 1
    }));
  });

  it('should handle SET_DEPARTMENTS', () => {
    const action = {
      type: actionTypes.SET_DEPARTMENTS,
      payload: [{name: 'dept'}]
    };

    expect(
      rootReducer(initialState, action)
    ).toEqual(Object.assign({}, initialState, {
      departments : action.payload
    }));
  });

  it('should handle SET_CATEGORIES', () => {
    const action = {
      type: actionTypes.SET_CATEGORIES,
      payload: [{name: 'cat'}]
    };

    expect(
      rootReducer(initialState, action)
    ).toEqual(Object.assign({}, initialState, {
      categories: action.payload
    }));
  });
});

