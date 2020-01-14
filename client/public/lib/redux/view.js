export default class View {
  constructor(el, store) {
    this._el = el;
    this._store = store;
    this._unsubscribe = store.subscribe(() => this.updateDom());
    this.updateDom();
  }

  updateDom() {
    if (!this._el) return;

    const result = this.render(this._store);
    if (result instanceof HTMLElement) {
      if (result !== this._el.firstChild) {
        while (this._el.firstChild) {
          this._el.removeChild(this._el.firstChild);
        }
        this._el.appendChild(result);
      }
    } else {
      this._el.innerHTML = result;
    }
  }

  destroy() {
    this._unsubscribe();
  }

  render() {
    throw new Error('You should override render method');
  }
}
