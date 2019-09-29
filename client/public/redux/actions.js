export const actionTypes = {
  CHANGE_SEARCH_STRING: 'CHANGE_SEARCH_STRING',
  REQUEST_FILES: 'REQUEST_FILES',
  RECEIVE_FILES: 'RECEIVE_FILES',
};

export function changeSearchAction(payload) {
  return {type: actionTypes.CHANGE_SEARCH_STRING, payload};
}

export function requestFiles() {
  return {type: actionTypes.REQUEST_FILES};
}

export function receiveFiles(files) {
  return {type: actionTypes.RECEIVE_FILES, payload: files};
}

export function fetchFiles(repoId) {
  return function (dispatch) {
    dispatch(requestFiles());

    fetch(`/api/repos/${repoId}`).then(response => {
      response.json().then((files) => {
        dispatch(receiveFiles(files));
      });
    });
  };
}
