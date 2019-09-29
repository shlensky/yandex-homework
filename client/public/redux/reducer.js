import {actionTypes} from './actions.js';

export function reducer(action, state) {
  switch (action.type) {
    case actionTypes.CHANGE_SEARCH_STRING:
      return {...state, searchString: action.payload};

    case actionTypes.REQUEST_FILES:
      return {...state, isFetching: true, files: []};

    case actionTypes.RECEIVE_FILES:
      return {...state, isFetching: false, files: action.payload};

    default:
      return {...state};
  }
}
