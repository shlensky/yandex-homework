export default function (store) {
  const next = store.dispatch.bind(store);

  store.dispatch = function (action) {
    if (action instanceof Function) {
      action(store.dispatch.bind(store));
    } else {
      next(action);
    }
  };
}
