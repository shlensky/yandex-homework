import {actionTypes} from './actions.js';

function compareNames(a, b) {
  return a.name > b.name ? -1 : 1;
}

function compareFileTypes(a, b) {
  return a.type === 'blob' && b.type === 'blob' ? 0 : a.type === 'blob' ? 1 : -1;
}

export function reducer(action, state) {
  switch (action.type) {
    case actionTypes.CHANGE_SEARCH_STRING:
      return {...state, searchString: action.payload};

    case actionTypes.REQUEST_FILES:
      return {...state, isFetching: true, files: []};

    case actionTypes.RECEIVE_FILES:
      return {...state, isFetching: false, files: action.payload.sort(compareNames).sort(compareFileTypes)};

    default:
      return {...state};
  }
}
