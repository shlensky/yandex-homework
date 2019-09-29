import Store from '../lib/redux/store.js';
import Logger from '../lib/redux/middleware/logger.js';
import Thunk from '../lib/redux/middleware/thunk.js';

import {reducer} from './reducer.js';
import {SearchInput} from './views.js';
import {fetchFiles} from './actions.js';

const initialState = {
  searchString: '',
  isFetching: false,
  files: [],
};
const store = new Store(initialState, reducer, [Logger, Thunk]);

// eslint-disable-next-line no-new
new SearchInput(document.getElementById('search-input-container'), store);

store.dispatch(fetchFiles());
