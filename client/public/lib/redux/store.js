export default class Store {
  constructor(initialState, reducer) {
    this._state = initialState;
    this._reducer = reducer;
    this._listeners = [];
  }

  dispatch(action) {
    this._state = this._reducer(action, this._state);
    console.info(`Action dispatched: ${action.type}`, this._state);
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
