(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  animateIn: function animateIn(el) {
    el.classList.add('animate', 'in');
    el.style.opacity = 1;
  },
  animateOut: function animateOut(el, onComplete) {
    el.classList.add('animate', 'out');
    el.addEventListener('transitionend', function handler() {
      onComplete();
      el.removeEventListener('transitionend', handler);
    });
  },
  animateOutBottom: function animateOutBottom(el, onComplete) {
    el.classList.add('animate', 'out-bottom');
    el.addEventListener('transitionend', function handler() {
      onComplete();
      el.removeEventListener('transitionend', handler);
    });
  },
  animateReset: function animateReset(el) {
    el.classList.add('animate', 'reset');
  },
  animatePanning: function animatePanning(el, left, opacity) {
    el.style.left = left + 'px';
    el.style.opacity = opacity;
  },
  animatePanEnd: function animatePanEnd(el, onComplete) {
    el.classList.add('animate', 'out');
    el.addEventListener('transitionend', function handler() {
      onComplete();
      el.removeEventListener('transitionend', handler);
    });
  },
  clearAnimation: function clearAnimation(toasts) {
    toasts.forEach(function (t, index) {
      setTimeout(function () {
        t.el.classList.add('animate', 'out');
        t.el.addEventListener('transitionend', function handler() {
          t.remove();
          t.el.removeEventListener('transitionend', handler);
        });
      }, index * 150); // stagger animations
    });
  }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Toasted; });
/* unused harmony export _show */
/* unused harmony export initiateCustomToasts */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__show__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animations__ = __webpack_require__(0);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var uuid = { generate: function generate() {
    return Date.now() + '-' + Math.random().toString(36).substring(2, 9);
  }

  /**
   * Toast
   * core instance of toast
   *
   * @param _options
   * @returns {Toasted}
   * @constructor
   */
};var Toasted = function Toasted(_options) {
  var _this = this;

  /**
   * Unique id of the toast
   */
  this.id = uuid.generate();

  /**
   * Shared Options of the Toast
   */
  this.options = _options;

  /**
   * Cached Options of the Toast
   */
  this.cached_options = {};

  /**
   * Shared Toasts list
   */
  this.global = {};

  /**
   * All Registered Groups
   */
  this.groups = [];

  /**
   * All Registered Toasts
   */
  this.toasts = [];

  /**
   * Element of the Toast Container
   */
  this.container = null;

  /**
   * Initiate toast container
   */
  initiateToastContainer(this);

  /**
   * Initiate custom toasts
   */
  initiateCustomToasts(this);

  /**
   * Create New Group of Toasts
   *
   * @param o
   */
  this.group = function (o) {
    if (!o) o = {};

    if (!o.globalToasts) {
      o.globalToasts = {};
    }

    // share parents global toasts
    Object.assign(o.globalToasts, _this.global);

    // tell parent about the group
    var group = new Toasted(o);
    _this.groups.push(group);

    return group;
  };

  /**
   * Register a Global Toast
   *
   * @param name
   * @param payload
   * @param options
   */
  this.register = function (name, payload, options) {
    options = options || {};
    return register(_this, name, payload, options);
  };

  /**
   * Show a Simple Toast
   *
   * @param message
   * @param options
   * @returns {*}
   */
  this.show = function (message, options) {
    return _show(_this, message, options);
  };

  /**
   * Show a Toast with Success Style
   *
   * @param message
   * @param options
   * @returns {*}
   */
  this.success = function (message, options) {
    options = options || {};
    options.type = 'success';
    return _show(_this, message, options);
  };

  /**
   * Show a Toast with Info Style
   *
   * @param message
   * @param options
   * @returns {*}
   */
  this.info = function (message, options) {
    options = options || {};
    options.type = 'info';
    return _show(_this, message, options);
  };

  /**
   * Show a Toast with Error Style
   *
   * @param message
   * @param options
   * @returns {*}
   */
  this.error = function (message, options) {
    options = options || {};
    options.type = 'error';
    return _show(_this, message, options);
  };

  /**
   * Remove a Toast
   * @param el
   */
  this.remove = function (el) {
    _this.toasts = _this.toasts.filter(function (t) {
      return t.el.hash !== el.hash;
    });
    if (el.parentNode) el.parentNode.removeChild(el);
  };

  /**
   * Clear All Toasts
   *
   * @returns {boolean}
   */
  this.clear = function (onClear) {
    __WEBPACK_IMPORTED_MODULE_1__animations__["a" /* default */].clearAnimation(_this.toasts, function () {
      onClear && onClear();
    });
    _this.toasts = [];

    return true;
  };

  return this;
};

/**
 * Wrapper for show method in order to manipulate options
 *
 * @param instance
 * @param message
 * @param options
 * @returns {*}
 * @private
 */
var _show = function _show(instance, message, options) {
  options = options || {};
  var toast = null;

  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
    console.error('Options should be a type of object. given : ' + options);
    return null;
  }

  // singleton feature
  if (instance.options.singleton && instance.toasts.length > 0) {
    instance.cached_options = options;
    instance.toasts[instance.toasts.length - 1].goAway(0);
  }

  // clone the global options
  var _options = Object.assign({}, instance.options);

  // merge the cached global options with options
  Object.assign(_options, options);

  toast = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__show__["a" /* default */])(instance, message, _options);
  instance.toasts.push(toast);

  return toast;
};

/**
 * Register the Custom Toasts
 */
var initiateCustomToasts = function initiateCustomToasts(instance) {
  var customToasts = instance.options.globalToasts;

  // this will initiate toast for the custom toast.
  var initiate = function initiate(message, options) {
    // check if passed option is a available method if so call it.
    if (typeof options === 'string' && instance[options]) {
      return instance[options].apply(instance, [message, {}]);
    }

    // or else create a new toast with passed options.
    return _show(instance, message, options);
  };

  if (customToasts) {
    instance.global = {};

    Object.keys(customToasts).forEach(function (key) {
      // register the custom toast events to the Toast.custom property
      instance.global[key] = function () {
        var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        //console.log(payload);
        // return the it in order to expose the Toast methods
        return customToasts[key].apply(null, [payload, initiate]);
      };
    });
  }
};

var initiateToastContainer = function initiateToastContainer(instance) {
  // create notification container
  var container = document.createElement('div');
  container.id = instance.id;
  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');
  container.setAttribute('aria-atomic', 'false');

  document.body.appendChild(container);
  instance.container = container;
};

var register = function register(instance, name, callback, options) {
  !instance.options.globalToasts ? instance.options.globalToasts = {} : null;

  instance.options.globalToasts[name] = function (payload, initiate) {
    // if call back is string we will keep it that way..
    var message = null;

    if (typeof callback === 'string') {
      message = callback;
    }

    if (typeof callback === 'function') {
      message = callback(payload);
    }

    return initiate(message, options);
  };

  initiateCustomToasts(instance);
};

/* unused harmony default export */ var _unused_webpack_default_export = ({ Toasted: Toasted });

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(9)

var Component = __webpack_require__(8)(
  /* script */
  null,
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_toast__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toast_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toast_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__toast_vue__);



var Toasted = {
    install: function install(Vue, options) {
        if (!options) {
            options = {};
        }

        var Toast = new __WEBPACK_IMPORTED_MODULE_0__js_toast__["a" /* Toasted */](options);
        Vue.component('toasted', __WEBPACK_IMPORTED_MODULE_1__toast_vue___default.a);
        Vue.toasted = Vue.prototype.$toasted = Toast;
    }
};

// register plugin if it is used via cdn or directly as a script tag
if (typeof window !== 'undefined' && window.Vue) {
    window.Toasted = Toasted;
}

/* harmony default export */ __webpack_exports__["default"] = (Toasted);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export goAway */
/* unused harmony export changeText */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return toastObject; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animations_js__ = __webpack_require__(0);
var _this = this;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



// fade the toast away
var _goAway = function _goAway(el, delay, instance) {

    // Animate toast out
    setTimeout(function () {

        // if the toast is on bottom set it as bottom animation
        if (instance.cached_options.position && instance.cached_options.position.includes('bottom')) {
            __WEBPACK_IMPORTED_MODULE_0__animations_js__["a" /* default */].animateOutBottom(el, function () {
                instance.remove(el);
            });
            return;
        }

        __WEBPACK_IMPORTED_MODULE_0__animations_js__["a" /* default */].animateOut(el, function () {
            instance.remove(el);
        });
    }, delay);

    return true;
};

// change the text of toast

var changeText = function changeText(el, text) {
    if ((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === "object" ? text instanceof HTMLElement : text && (typeof text === 'undefined' ? 'undefined' : _typeof(text)) === "object" && text !== null && text.nodeType === 1 && typeof text.nodeName === "string") {
        el.appendChild(text);
    } else {
        el.innerHTML = text;
    }

    return _this;
};

var toastObject = function toastObject(el, instance) {
    var _disposed = false;

    return {
        el: el,
        text: function text(_text) {
            changeText(el, _text);
            return this;
        },
        goAway: function goAway() {
            var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 800;

            _disposed = true;
            return _goAway(el, delay, instance);
        },
        remove: function remove() {
            instance.remove(el);
        },
        disposed: function disposed() {
            return _disposed;
        }
    };
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animations__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__object__ = __webpack_require__(4);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var uuid = { generate: function generate() {
    return Date.now() + '-' + Math.random().toString(36).substring(2, 9);
  }

  // string includes polyfill
};if (!String.prototype.includes) {
  Object.defineProperty(String.prototype, 'includes', {
    value: function value(search, start) {
      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    }
  });
}

var _options = {};
var _instance = null;
/**
 * parse Options
 *
 * @param options
 * @returns {{el: *, text: text, goAway: goAway}}
 */
var parseOptions = function parseOptions(options) {
  // class name to be added on the toast
  options.className = options.className || null;

  // complete call back of the toast
  options.onComplete = options.onComplete || null;

  // toast position
  options.position = options.position || 'top-right';

  // toast duration
  options.duration = options.duration || null;

  // keep toast open on mouse over
  options.keepOnHover = options.keepOnHover || false;

  // normal type will allow the basic color
  options.theme = options.theme || 'toasted-primary';

  // normal type will allow the basic color
  options.type = options.type || 'default';

  // class name to be added on the toast container
  options.containerClass = options.containerClass || null;

  // check if the fullWidth is enabled
  options.fullWidth = options.fullWidth || false;

  // get icon name
  options.icon = options.icon || null;

  // get action name
  options.action = options.action || null;

  // check if the toast needs to be fitted in the screen (no margin gap between screen)
  options.fitToScreen = options.fitToScreen || null;

  // check if closes the toast when the user swipes it
  options.closeOnSwipe = typeof options.closeOnSwipe !== 'undefined' ? options.closeOnSwipe : true;

  // get the icon pack name. defaults to material
  options.iconPack = options.iconPack || 'material';

  /* transform options */

  // toast class
  if (options.className && typeof options.className === 'string') {
    options.className = options.className.split(' ');
  }

  if (!options.className) {
    options.className = [];
  }

  options.theme && options.className.push(options.theme.trim());
  options.type && options.className.push(options.type);

  // toast container class
  if (options.containerClass && typeof options.containerClass === 'string') {
    options.containerClass = options.containerClass.split(' ');
  }

  if (!options.containerClass) {
    options.containerClass = [];
  }

  options.position && options.containerClass.push(options.position.trim());
  options.fullWidth && options.containerClass.push('full-width');
  options.fitToScreen && options.containerClass.push('fit-to-screen');

  _options = options;
  return options;
};

var createToast = function createToast(html, options) {
  // Create toast
  var toast = document.createElement('div');
  toast.classList.add('toasted');

  // set unique identifier
  toast.hash = uuid.generate();

  if (options.className) {
    options.className.forEach(function (className) {
      toast.classList.add(className);
    });
  }

  // If type of parameter is HTML Element
  if ((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? html instanceof HTMLElement : html && (typeof html === 'undefined' ? 'undefined' : _typeof(html)) === 'object' && html !== null && html.nodeType === 1 && typeof html.nodeName === 'string') {
    toast.appendChild(html);
  } else {
    // Insert as text;
    toast.innerHTML = html;
  }

  // add material icon if available
  createIcon(options, toast);

  // create and append actions
  if (Array.isArray(options.action)) {
    options.action.forEach(function (action) {
      var el = createAction(action, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__object__["a" /* toastObject */])(toast, _instance));
      if (el) toast.appendChild(el);
    });
  } else if (_typeof(options.action) === 'object') {
    var action = createAction(options.action, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__object__["a" /* toastObject */])(toast, _instance));
    if (action) toast.appendChild(action);
  }

  return toast;
};

var createIcon = function createIcon(options, toast) {
  // add material icon if available
  if (options.icon) {
    var iel = document.createElement('i');
    iel.setAttribute('aria-hidden', 'true');

    switch (options.iconPack) {
      case 'fontawesome':
        iel.classList.add('fa');

        var faName = options.icon.name ? options.icon.name : options.icon;

        if (faName.includes('fa-')) {
          iel.classList.add(faName.trim());
        } else {
          iel.classList.add('fa-' + faName.trim());
        }

        break;
      case 'mdi':
        iel.classList.add('mdi');

        var mdiName = options.icon.name ? options.icon.name : options.icon;

        if (mdiName.includes('mdi-')) {
          iel.classList.add(mdiName.trim());
        } else {
          iel.classList.add('mdi-' + mdiName.trim());
        }

        break;
      case 'custom-class':
        var classes = options.icon.name ? options.icon.name : options.icon;

        if (typeof classes === 'string') {
          classes.split(' ').forEach(function (className) {
            iel.classList.add(className);
          });
        } else if (Array.isArray(classes)) {
          classes.forEach(function (className) {
            iel.classList.add(className.trim());
          });
        }

        break;
      case 'callback':
        var callback = options.icon && options.icon instanceof Function ? options.icon : null;

        if (callback) {
          iel = callback(iel);
        }

        break;
      default:
        iel.classList.add('material-icons');
        iel.textContent = options.icon.name ? options.icon.name : options.icon;
    }

    if (options.icon.after) {
      iel.classList.add('after');
    }

    appendIcon(options, iel, toast);
  }
};

var appendIcon = function appendIcon(options, el, toast) {
  if (options.icon) {
    if (options.icon.after && options.icon.name) {
      toast.appendChild(el);
    } else if (options.icon.name) {
      toast.insertBefore(el, toast.firstChild);
    } else {
      toast.insertBefore(el, toast.firstChild);
    }
  }
};

/**
 * Create Action for the toast
 *
 * @param action
 * @param toastObject
 * @returns {Element}
 */
var createAction = function createAction(action, toastObject) {
  if (!action) {
    return null;
  }

  var el = void 0;
  if (action.href) {
    el = document.createElement('a');
  } else {
    el = document.createElement('button');
  }

  el.classList.add('action');
  el.classList.add('ripple');

  if (action.text) {
    el.text = action.text;
  }

  if (action.href) {
    el.href = action.href;
  }

  if (action.target) {
    el.target = action.target;
  }

  if (action.icon) {
    // add icon class to style it
    el.classList.add('icon');

    // create icon element
    var iel = document.createElement('i');

    switch (_options.iconPack) {
      case 'fontawesome':
        iel.classList.add('fa');

        if (action.icon.includes('fa-')) {
          iel.classList.add(action.icon.trim());
        } else {
          iel.classList.add('fa-' + action.icon.trim());
        }

        break;
      case 'mdi':
        iel.classList.add('mdi');

        if (action.icon.includes('mdi-')) {
          iel.classList.add(action.icon.trim());
        } else {
          iel.classList.add('mdi-' + action.icon.trim());
        }

        break;
      case 'custom-class':
        if (typeof action.icon === 'string') {
          action.icon.split(' ').forEach(function (className) {
            el.classList.add(className);
          });
        } else if (Array.isArray(action.icon)) {
          action.icon.forEach(function (className) {
            el.classList.add(className.trim());
          });
        }

        break;
      default:
        iel.classList.add('material-icons');
        iel.textContent = action.icon;
    }

    // append it to the button
    el.appendChild(iel);
  }

  if (action.class) {
    if (typeof action.class === 'string') {
      action.class.split(' ').forEach(function (className) {
        el.classList.add(className);
      });
    } else if (Array.isArray(action.class)) {
      action.class.forEach(function (className) {
        el.classList.add(className.trim());
      });
    }
  }

  // initiate push with ready
  if (action.push) {
    el.addEventListener('click', function (e) {
      e.preventDefault();

      // check if vue router passed through global options
      if (!_options.router) {
        console.warn('[vue-toasted] : Vue Router instance is not attached. please check the docs');
        return;
      }

      _options.router.push(action.push);

      // fade away toast after action.
      if (!action.push.dontClose) {
        toastObject.goAway(0);
      }
    });
  }

  if (action.onClick && typeof action.onClick === 'function') {
    el.addEventListener('click', function (e) {
      if (action.onClick) {
        e.preventDefault();
        action.onClick(e, toastObject);
      }
    });
  }

  return el;
};

/**
 * this method will create the toast
 *
 * @param instance
 * @param message
 * @param options
 * @returns {{el: *, text: text, goAway: goAway}}
 */
/* harmony default export */ __webpack_exports__["a"] = (function (instance, message, options) {
  // share the instance across
  _instance = instance;

  options = parseOptions(options);
  var container = _instance.container;

  options.containerClass.unshift('toasted-container');

  // check if the container classes has changed if so update it
  if (container.className !== options.containerClass.join(' ')) {
    container.className = '';
    options.containerClass.forEach(function (className) {
      container.classList.add(className);
    });
  }

  // Select and append toast
  var newToast = createToast(message, options);

  // only append toast if message is not undefined
  if (message) {
    container.appendChild(newToast);
  }

  newToast.style.opacity = 0;

  // Animate toast in
  __WEBPACK_IMPORTED_MODULE_0__animations__["a" /* default */].animateIn(newToast);

  // Allows timer to be pause while being panned
  var timeLeft = options.duration;
  var counterInterval = void 0;
  if (timeLeft !== null) {
    var createInterval = function createInterval() {
      return setInterval(function () {
        if (newToast.parentNode === null) window.clearInterval(counterInterval);

        // If toast is not being dragged, decrease its time remaining
        if (!newToast.classList.contains('panning')) {
          timeLeft -= 20;
        }

        if (timeLeft <= 0) {
          // Animate toast out

          __WEBPACK_IMPORTED_MODULE_0__animations__["a" /* default */].animateOut(newToast, function () {
            // Call the optional callback
            if (typeof options.onComplete === 'function') options.onComplete();
            // Remove toast after it times out
            if (newToast.parentNode) {
              _instance.remove(newToast);
            }
          });

          window.clearInterval(counterInterval);
        }
      }, 20);
    };

    counterInterval = createInterval();

    // Toggle interval on hover
    if (options.keepOnHover) {
      newToast.addEventListener('mouseover', function () {
        window.clearInterval(counterInterval);
      });
      newToast.addEventListener('mouseout', function () {
        counterInterval = createInterval();
      });
    }
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__object__["a" /* toastObject */])(newToast, _instance);
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".toasted{padding:0 20px}.toasted.rounded{border-radius:24px}.toasted .primary,.toasted.toasted-primary{border-radius:2px;min-height:38px;line-height:1.1em;background-color:#353535;padding:6px 20px;font-size:15px;font-weight:300;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.toasted .primary.success,.toasted.toasted-primary.success{background:#4caf50}.toasted .primary.error,.toasted.toasted-primary.error{background:#f44336}.toasted .primary.info,.toasted.toasted-primary.info{background:#3f51b5}.toasted .primary .action,.toasted.toasted-primary .action{color:#a1c2fa}.toasted.bubble{border-radius:30px;min-height:38px;line-height:1.1em;background-color:#ff7043;padding:0 20px;font-size:15px;font-weight:300;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.toasted.bubble.success{background:#4caf50}.toasted.bubble.error{background:#f44336}.toasted.bubble.info{background:#3f51b5}.toasted.bubble .action{color:#8e2b0c}.toasted.outline{border-radius:30px;min-height:38px;line-height:1.1em;background-color:#fff;border:1px solid #676767;padding:0 20px;font-size:15px;color:#676767;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);font-weight:700}.toasted.outline.success{color:#4caf50;border-color:#4caf50}.toasted.outline.error{color:#f44336;border-color:#f44336}.toasted.outline.info{color:#3f51b5;border-color:#3f51b5}.toasted.outline .action{color:#607d8b}.toasted-container .animate{transition:all .3s ease-out;opacity:0}.toasted-container .animate.in{transform:translateY(-35px);opacity:1!important}.toasted-container .animate.out{opacity:0;margin-top:-40px}.toasted-container .animate.out-bottom{opacity:0;margin-bottom:-40px}.toasted-container .animate.reset{left:0;opacity:1}.toasted-container .animate.panning{transition:left .01s ease-out,opacity .01s ease-out}.toasted-container{position:fixed;z-index:10000}.toasted-container,.toasted-container.full-width{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.toasted-container.full-width{max-width:86%;width:100%}.toasted-container.full-width.fit-to-screen{min-width:100%}.toasted-container.full-width.fit-to-screen .toasted:first-child{margin-top:0}.toasted-container.full-width.fit-to-screen.top-right{top:0;right:0}.toasted-container.full-width.fit-to-screen.top-left{top:0;left:0}.toasted-container.full-width.fit-to-screen.top-center{top:0;left:0;transform:translateX(0)}.toasted-container.full-width.fit-to-screen.bottom-right{right:0;bottom:0}.toasted-container.full-width.fit-to-screen.bottom-left{left:0;bottom:0}.toasted-container.full-width.fit-to-screen.bottom-center{left:0;bottom:0;transform:translateX(0)}.toasted-container.top-right{top:10%;right:7%}.toasted-container.top-left{top:10%;left:7%}.toasted-container.top-center{top:10%;left:50%;transform:translateX(-50%)}.toasted-container.bottom-right{right:5%;bottom:7%}.toasted-container.bottom-left{left:5%;bottom:7%}.toasted-container.bottom-center{left:50%;transform:translateX(-50%);bottom:7%}.toasted-container.bottom-left .toasted,.toasted-container.top-left .toasted{float:left}.toasted-container.bottom-right .toasted,.toasted-container.top-right .toasted{float:right}.toasted-container .toasted{top:35px;width:auto;clear:both;margin-top:10px;position:relative;max-width:100%;height:auto;word-break:normal;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;box-sizing:inherit}.toasted-container .toasted .fa,.toasted-container .toasted .fab,.toasted-container .toasted .far,.toasted-container .toasted .fas,.toasted-container .toasted .material-icons,.toasted-container .toasted .mdi{margin-right:.5rem;margin-left:-.4rem}.toasted-container .toasted .fa.after,.toasted-container .toasted .fab.after,.toasted-container .toasted .far.after,.toasted-container .toasted .fas.after,.toasted-container .toasted .material-icons.after,.toasted-container .toasted .mdi.after{margin-left:.5rem;margin-right:-.4rem}.toasted-container .toasted .action{text-decoration:none;font-size:.8rem;padding:8px;margin:5px -7px 5px 7px;border-radius:3px;text-transform:uppercase;letter-spacing:.03em;font-weight:600;cursor:pointer}.toasted-container .toasted button.action{background:none;color:inherit;border:none;font:inherit;line-height:normal}.toasted-container .toasted .action.icon{padding:4px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.toasted-container .toasted .action.icon .fa,.toasted-container .toasted .action.icon .material-icons,.toasted-container .toasted .action.icon .mdi{margin-right:0;margin-left:4px}.toasted-container .toasted .action.icon:hover{text-decoration:none}.toasted-container .toasted .action:hover{text-decoration:underline}@media only screen and (max-width:600px){.toasted-container{min-width:100%}.toasted-container .toasted:first-child{margin-top:0}.toasted-container.top-right{top:0;right:0}.toasted-container.top-left{top:0;left:0}.toasted-container.top-center{top:0;left:0;transform:translateX(0)}.toasted-container.bottom-right{right:0;bottom:0}.toasted-container.bottom-left{left:0;bottom:0}.toasted-container.bottom-center{left:0;bottom:0;transform:translateX(0)}.toasted-container.bottom-center,.toasted-container.top-center{-ms-flex-align:stretch!important;align-items:stretch!important}.toasted-container.bottom-left .toasted,.toasted-container.bottom-right .toasted,.toasted-container.top-left .toasted,.toasted-container.top-right .toasted{float:none}.toasted-container .toasted{border-radius:0}}", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(10)("257ec9da", content, true, {});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(11)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=vue-toasted.js.map