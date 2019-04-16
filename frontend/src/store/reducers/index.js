import * as actionTypes from '../../constants/action-types';

export const initialState = {
  searchQuery: '',
  activeDepartment: '',
  activeCategory: ''
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_QUERY:
      return Object.assign({}, state, {
        searchQuery: action.payload,
        activeDepartment: '',
        activeCategory: ''
      });
    case actionTypes.SET_ACTIVE_DEPARTMENT:
      return Object.assign({}, state, {
        activeDepartment: action.payload,
        searchQuery: ''
      });
    case actionTypes.SET_ACTIVE_CATEGORY:
      return Object.assign({}, state, {
        activeCategory: action.payload,
        searchQuery: ''
      });
    default: {
      return state;
    }
  }
};