const STYLE = 'color: #2196F3; font-weight: bold';

export default function (store) {
  const next = store.dispatch.bind(store);

  store.dispatch = function (action) {
    console.group(action.type);
    console.info('%cDispatching', STYLE, action);
    next(action);
    console.info('%cAction dispatched', STYLE, store.getState());
    console.groupEnd();
  };
}
