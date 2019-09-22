(function (global) {
  var hasNativePromise = global.Promise
    && global.Promise.resolve
    && Object.prototype.toString.call(global.Promise.resolve({})) === '[object Promise]';

  if (hasNativePromise) {
    return;
  }

  var PENDING = 'pending';
  var FULFILLED = 'fulfilled';
  var REJECTED = 'rejected';

  function isPromise(value) {
    return value && typeof value === 'object' && value.constructor === Promise;
  }

  function isThenable(value) {
    if (value && (typeof value === 'function' || typeof value === 'object')) {
      /*
        This procedure of first storing a reference to x.then, then testing that reference,
        and then calling that reference, avoids multiple accesses to the x.then property.
        Such precautions are important for ensuring consistency in the face of an accessor property,
        whose value could change between retrievals.
      */
      var then = value.then;
      if (typeof then === 'function') {
        return then.bind(value);
      }
    }

    return false;
  }

  function handleThenable(promise, x) {
    try {
      var then = isThenable(x);
    } catch (e) {
      reject(promise, e);
      return true;
    }

    if (then) {
      var settled = false;
      try {
        then(
          function (y) {
            if (settled) return;
            settled = true;
            fulfill(promise, y);
          },

          function (r) {
            if (settled) return;
            settled = true;
            reject(promise, r);
          }
        )
      } catch (e) {
        if (!settled) {
          reject(promise, e);
        }
      }

      return true;
    }

    return false;
  }

  function handleSubscriptions(promise, method) {
    promise._subscriptions.forEach(function (subscription) {
      var value = promise._value;
      try {
        if (typeof subscription[method] === 'function') {
          value = subscription[method](value);
        }

        if (subscription.promise2 === value) {
          throw new TypeError('A promises callback cannot return that same promise.');
        }

        if (handleThenable(subscription.promise2, value)) {
          return;
        }

        method === 'onRejected' && typeof subscription[method] !== 'function' ?
          reject(subscription.promise2, value) :
          fulfill(subscription.promise2, value);

      } catch (e) {
        reject(subscription.promise2, e);
      }
    })
  }

  function fulfill(promise, x) {
    // If x is a promise, adopt its state
    if (isPromise(x)) {
      x.then(fulfill.bind(undefined, promise), reject.bind(undefined, promise));
      return;
    }

    if (promise._state === PENDING && !promise._value) {

      if (handleThenable(promise, x)) {
        return;
      }

      promise._value = x;
      promise._state = FULFILLED;
      handleSubscriptions(promise, 'onFulfilled');
    }
  }

  function reject(promise, reason) {
    if (promise._state === PENDING && !promise._value) {
      promise._state = REJECTED;
      promise._value = reason;

      handleSubscriptions(promise, 'onRejected');
    }
  }

  function invokeResolver(resolver, promise) {
    function resolvePromise(value) {
      setTimeout(function () {
        fulfill(promise, value)
      }, 0);
    }

    function rejectPromise(reason) {
      setTimeout(function () {
        reject(promise, reason)
      }, 0);
    }

    try {
      resolver(resolvePromise, rejectPromise);
    } catch (e) {
      rejectPromise(e);
    }
  }

  function Promise(resolver) {
    if (typeof resolver !== 'function') {
      throw new TypeError('Promise resolver ' + resolver + ' is not a function');
    }

    if (this instanceof Promise === false) {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    this._state = PENDING;
    this._subscriptions = [];
    invokeResolver(resolver, this);
  }

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var subscription = {
      onFulfilled: typeof onFulfilled === 'function' && onFulfilled.bind(undefined),
      onRejected: typeof onRejected === 'function' && onRejected.bind(undefined),
      promise2: new Promise(function () {
      })
    };

    if (this._state === FULFILLED && typeof onFulfilled === 'function') {
      setTimeout(function () {
        fulfill(subscription.promise2, onFulfilled(this._value));
      }.bind(this), 0);
    }
    if (this._state === REJECTED && typeof onRejected === 'function') {
      setTimeout(function () {
        reject(subscription.promise2, onRejected(this._value));
      }.bind(this), 0);
    } else {
      this._subscriptions.push(subscription);
    }

    return subscription.promise2;
  };

  Promise.prototype.catch = function(onRejected) {
    return this.then(undefined, onRejected);
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (reason) {
    return new Promise(function (_, reject) {
      reject(reason);
    });
  };

  global.Promise = Promise;
})(typeof global === 'object' ? global : window);
