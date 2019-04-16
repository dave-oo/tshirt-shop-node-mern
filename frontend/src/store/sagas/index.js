import {takeEvery, call, put} from 'redux-saga/effects';
import * as actionTypes from '../../constants/action-types';
import {getProductsPerPage, getNumberOfProducts} from "../../api";

export default function* () {
  // yield takeEvery(actionTypes.GET_PRODUCTS_PER_PAGE, getProductsPerPageSaga);
  // yield takeEvery(actionTypes.GET_NUMBER_OF_PRODUCTS, getNumberOfProductsSaga);
  // yield takeEvery(actionTypes.GET_DEPARTMENT, getNumberOfProductsSaga);
  // yield takeEvery(actionTypes.SET_SEARCH_QUERY, searchProductsSaga);
}

export function* getProductsPerPageSaga(action) {
  try {
    yield put({type: actionTypes.GET_NUMBER_OF_PRODUCTS, payload: action.payload});
    const payload = yield call(getProductsPerPage, action.payload);
    yield put({type: actionTypes.GET_PRODUCTS_SUCCESS, payload});
  } catch (e) {
    yield put({type: actionTypes.GET_PRODUCTS_ERROR})
  }
}

export function* getNumberOfProductsSaga(action) {
  try {
    const payload = yield call(getNumberOfProducts, action.payload);
    yield put({type: actionTypes.GET_NUMBER_OF_PRODUCTS_SUCCESS, payload});
  } catch (e) {
    yield put({type: actionTypes.GET_PRODUCTS_ERROR})
  }
}

export function* searchProductsSaga(action) {
  try {
    yield put({type: actionTypes.SET_SEARCH_QUERY, payload: action.payload});
    yield put({type: actionTypes.GET_NUMBER_OF_PRODUCTS, payload: {searchQuery: action.payload}});
    yield put({
      type: actionTypes.GET_PRODUCTS_PER_PAGE,
      payload: {
        activePage: 1,
        pageLength: 6,
        searchQuery: action.payload
      }
    });
  } catch (e) {
    yield put({type: actionTypes.GET_PRODUCTS_ERROR})
  }
}

export function* getDepartmentSaga() {

}