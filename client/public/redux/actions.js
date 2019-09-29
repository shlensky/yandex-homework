export const actionTypes = {
  CHANGE_SEARCH_STRING: 'CHANGE_SEARCH_STRING',
};

export function changeSearchAction(payload) {
  return {type: actionTypes.CHANGE_SEARCH_STRING, payload};
}
