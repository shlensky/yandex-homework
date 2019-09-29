import Store from '../lib/redux/store.js';
import Logger from '../lib/redux/middleware/logger.js';
import Thunk from '../lib/redux/middleware/thunk.js';

import {reducer} from './reducer.js';
import {SearchInputView, FilesView} from './views.js';
import {fetchFiles} from './actions.js';
import {getQueryVariable} from './utils.js';

const initialState = {
  searchString: '',
  isFetching: true,
  files: [],
};
const store = new Store(initialState, reducer, [Logger, Thunk]);

/* eslint-disable no-new */
new SearchInputView(document.getElementById('search-input-container'), store);
new FilesView(document.getElementById('files-container'), store);

const DEFAULT_REPO_ID = 'yandex-homework';
const repoId = getQueryVariable('repoId') || DEFAULT_REPO_ID;
store.dispatch(fetchFiles(repoId));
