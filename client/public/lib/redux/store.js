export default class Store {
  constructor(initialState, reducer, middlewares) {
    this._state = initialState;
    this._reducer = reducer;
    this._listeners = [];

    if (Array.isArray(middlewares)) {
      middlewares.forEach(middleware => middleware(this));
    }
  }

  dispatch(action) {
    this._state = this._reducer(action, this._state);
    this._notifyListeners();
  }

  subscribe(listener) {
    this._listeners.push(listener);

    return () => {
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
  }

  getState() {
    return this._state;
  }

  _notifyListeners() {
    this._listeners.forEach((listener) => listener(this));
  }
}
