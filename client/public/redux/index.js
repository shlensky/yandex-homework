import Store from '../lib/redux/store.js';
import {reducer} from './reducer.js';
import {SearchInput} from './views.js';

const initialState = {
  searchString: '',
};
const store = new Store(initialState, reducer);

// eslint-disable-next-line no-new
new SearchInput(document.getElementById('search-input-container'), store);
