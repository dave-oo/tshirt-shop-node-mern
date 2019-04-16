import * as actions from './index'
import * as types from '../../constants/action-types'

describe('actions', () => {
  it('should create an action to get a page of products', () => {
    const payload = {
      activePage: 1,
      pageLength: 2
    };
    const expectedAction = {
      type: types.GET_PRODUCTS_PER_PAGE,
      payload
    };

    expect(actions.getProductsPerPage(payload)).toEqual(expectedAction)
  });

  it('should create an action to get number of products', () => {
    const expectedAction = {
      type: types.GET_NUMBER_OF_PRODUCTS
    };

    expect(actions.getNumberOfProducts()).toEqual(expectedAction)
  });

  it('should create an action to get department', () => {
    const expectedAction = {
      type: types.GET_DEPARTMENT,
      payload: 'dept'
    };

    expect(actions.getDepartment(expectedAction.payload)).toEqual(expectedAction)
  });

  it('should create an action to get category', () => {
    const expectedAction = {
      type: types.GET_CATEGORY,
      payload: 'cat'
    };

    expect(actions.getCategory(expectedAction.payload)).toEqual(expectedAction)
  });

  it('should create an action to perform a setSearchQuery', () => {
    const payload = {searchQuery: 'test'};
    const expectedAction = {
      type: types.SET_SEARCH_QUERY,
      payload
    };

    expect(actions.setSearchQuery(payload)).toEqual(expectedAction)
  })
});