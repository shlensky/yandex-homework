import View from '../lib/redux/view.js';
import {changeSearchAction} from './actions.js';

function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.firstChild;
}

export class SearchInput extends View {
  render(store) {
    const {searchString} = store.getState();

    if (!this.input) {
      this.input = createElementFromHTML(`
        <input 
            type="search" 
            placeholder="Search files by name"
            class="SearchInput"            
            value="${searchString.replace('"', '\\"')}">    
        `);

      this.input.addEventListener('input', (e) => {
        store.dispatch(changeSearchAction(e.target.value));
      });
    }

    this.input.value = searchString;

    return this.input;
  }
}
