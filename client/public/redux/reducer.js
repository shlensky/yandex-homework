import {actionTypes} from './actions.js';

export function reducer(action, state) {
  switch (action.type) {
    case actionTypes.CHANGE_SEARCH_STRING:
      return {...state, searchString: action.payload};

    default:
      return state;
  }
}
