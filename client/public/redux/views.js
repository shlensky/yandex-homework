import View from '../lib/redux/view.js';
import {changeSearchAction} from './actions.js';

function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.firstChild;
}

export class SearchInputView extends View {
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

export class FilesView extends View {
  getIcon(file) {
    return file.type === 'blob' ? 'code_file' : 'folder';
  }

  render(store) {
    const {isFetching, files} = store.getState();

    if (isFetching) {
      return '<div class="Loader">Loading...</div>';
    }

    return `
      <table class="Table DesktopOnly">
        <thead>
        <tr>
          <th class="Table-Head">Name</th>
          <th class="Table-Head">Last commit</th>
          <th class="Table-Head">Last message</th>
          <th class="Table-Head">Committer</th>
          <th class="Table-Head">Updated</th>
        </tr>
        </thead>
        <tbody>
        ${files.map((file) => `
          <tr>
            <td class="Table-Data">
              <a class="PlainLink" href="<%= file.href || '#' %>">
                <img src="images/${this.getIcon(file)}.svg" alt="${this.getIcon(file)}">
                ${file.name}
              </a>
            </td>
            <td class="Table-Data"><a class="Link" href="commit.html">h5jdsv</a></td>
            <td class="Table-Data">Hello world (last message not yet implemented on backend)</td>
            <td class="Table-Data"><a class="Username" href="#">shlensky</a></td>
            <td class="Table-Data">Sep 29, 2019</td>
          </tr>
        `).join('')}
        </tbody>
      </table>
          
      <div class="List MobileOnly">
      ${files.map((file) => `
        <div class="List-Item">
          <div class="List-ItemContent">
            <a class="PlainLink List-ItemContentRow" href="<%= file.href || '#' %>">
              <img src="images/${this.getIcon(file)}.svg" alt="${this.getIcon(file)}">
              ${file.name}
            </a>
        
            <div class="List-ItemContentRow">
              Hello world (last message not yet implemented on backend)
            </div>
        
            <div class="List-ItemContentRow">
              <a class="Link" href="commit.html">h5jdsv</a>
              by <a class="Username" href="#">shlensky</a>,
              Sep 29, 2019
            </div>
          </div>
        
          <div class="List-ItemArrow">
            <a href="<%= file.href || '#' %>">
              <img src="images/list_arrow.svg" alt="arrow">
            </a>
          </div>
        </div>
      `).join('')}
      </div>      
    `;
  }
}
