import {actionTypes} from './actions.js';

function compareFileTypes(a, b) {
  return a.type === 'blob' && b.type === 'blob' ? 0 : a.type === 'blob' ? 1 : -1;
}

function searchByName(files, searchString) {
  if (!Array.isArray(files)) return [];

  searchString = searchString.toLowerCase();
  return files.filter(file => file.name.toLowerCase().includes(searchString));
}

export function reducer(action, state) {
  switch (action.type) {
    case actionTypes.CHANGE_SEARCH_STRING:
      return {...state, searchString: action.payload, files: searchByName(state.filesOrig, action.payload)};

    case actionTypes.REQUEST_FILES:
      return {...state, isFetching: true};

    case actionTypes.RECEIVE_FILES:
      var files = action.payload.sort().sort(compareFileTypes);
      return {...state, isFetching: false, files: searchByName(files, state.searchString), filesOrig: files};

    default:
      return {...state};
  }
}
