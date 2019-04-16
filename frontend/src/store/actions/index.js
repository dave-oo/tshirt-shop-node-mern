import * as actionTypes from '../../constants/action-types';

export const setSearchQuery = payload => ({
  type: actionTypes.SET_SEARCH_QUERY,
  payload
});

export const setActiveCategory = payload => ({
  type: actionTypes.SET_ACTIVE_CATEGORY,
  payload
});

export const setActiveDepartment = payload => ({
  type: actionTypes.SET_ACTIVE_DEPARTMENT,
  payload
});
