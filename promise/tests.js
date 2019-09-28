// Unset native promise to use polyfill
global.Promise = undefined;
require('./promise.polyfill');

var promisesAplusTests = require('promises-aplus-tests');

var adapter = {
  deferred: function() {
    var obj = { promise: undefined, resolve: undefined, reject: undefined };
    obj.promise = new Promise(function(resolve, reject) {
      obj.resolve = resolve;
      obj.reject = reject;
    });

    return obj;
  },
  resolved: Promise.resolve,
  rejected: Promise.reject,
};
promisesAplusTests(adapter, function (err) {
  // All done; output is in the console. Or check `err` for number of failures.
});
