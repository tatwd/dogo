// DOM Getter
//
function dom (... selectors) {

  // get dom objects
  function getDOM(selectors) {
    return selectors.map(selector => selector.startsWith('#') 
      ? document.querySelector(selector)
      : document.querySelectorAll(selector));
  }

  // DOM Class
  class DOM {
    constructor(selectors) {
      this.selectors = selectors;
      this.domArr = getDOM(selectors);
      this.filter = {
        at: [0],
        of: [0]
      };
    }

    // get all dom objects
    all () {
      return this.domArr;
    }

    // get first one of all
    first () {
      return this.domArr.map(dom => 
        dom instanceof NodeList ? dom[0] : dom
      );
    }

    // get last one of all
    last () {
      return this.domArr.map(dom => 
        dom instanceof NodeList ? dom[dom.length - 1] : dom
      );
    }

    // if call this function then must call `of` function.
    // e.g. dogo.dom('.foo', '.boo').at(0, 1).of([0, 1], [0, 1])
    at (... atIndex) {
      this.filter.at = atIndex || this.filter.at;
      return this;
    }

    // after `at` function
    of (... itemIndex) {
      this.filter.of = itemIndex || this.filter.of;

      let _at = this.filter.at;
      let _of = this.filter.of;

      return this
        .domArr
        .map((dom, index) => {
          if (_at.includes(index)) {
            let atIndex = _at.findIndex(item => item === index);
            let _dom = [];

            // e.g. at(0, 1).of(1)
            if (atIndex === _of.length) {
              return dom;
            }

            return Array.isArray(_of[atIndex]) 
              ? (
                _of[atIndex].forEach(item => _dom.push(dom[item])), _dom.length === 1 ? _dom[0] : _dom)
              : dom[_of[atIndex]];
          } else {
            return dom;
          }
        });
    }

    // other
  }

  return new DOM(selectors);
}

// AJAX Encapsulation
//
function ajax (
  url,
  settings = {
    method: 'GET',
    responseType: '',
    header: {},
    timeout: 0,
    data: null,
    isAsync: true
  }) {
  
  // set default values
  // ({ method = 'GET', responseType = '', header = {}, timeout = 0, data = null, isAsync = true } = settings);
  let { method, responseType, header, timeout, data, isAsync } = settings;

  // get XMLHttpRequest object
  let getXhr = () => new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

  class DataFormater {
    constructor(data) {
      this._data = data;
    }

    getText() {
      return this._data;
    }

    getJson() {
      let __data = typeof this._data === 'object'
        ? this._data
        : JSON.parse(this._data);

      return __data === null
        ? __data
        : (__data.d && __data.d !== '' ? JSON.parse(__data.d) : __data);
    }

    // other format methods here
  }

  return new Promise((resolve, reject) => {
    const xhr = getXhr();

    xhr.open(method, url, isAsync);

    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;

      this.status === 200
        ? resolve(new DataFormater(this.response))
        : reject(new Error(this.statusText));
    };

    xhr.timeout = timeout;
    xhr.responseType = responseType;

    // set request header
    for (let item in header) {
      xhr.setRequestHeader(item, header[item]);
    }

    xhr.send(data);
  });
}

// Type Checker
//
const type = function () {

  const _TYPE = {
    _NULL     : 'null',
    _UNDEFINED: 'undfined',
    _NAN      : 'NaN',
    _OBJECT   : 'Object',
    _NUMBER   : 'Number',
    _STRING   : 'String',
    _ARRAY    : 'Array',
    _FUNCTION : 'Function',
    _REGEXP   : 'RegExp',
    _ERROR    : 'Error'
  };

  // let class2type = {}, toString = class2type.toString;
  
  // class to type excludes `NaN`
  function _type (obj) {
    return obj == null
      ? String(obj)
      : (toString.call(obj)).split(' ')[1].replace(']', '') || _TYPE._OBJECT;
      // : class2type[toString.call(obj)] || _TYPE._OBJECT;
  }
  
  _type.isNull = function (obj) { return obj === null;};

  _type.isUndefined = function (obj) { return obj === undefined };

  // true if obj is `null` or `undefined`
  _type.isNone = function (obj) { return obj == null };

  _type.isNaN = Number.isNaN || function (obj) { return obj != obj };

  _type.isNumber = function (obj) {
    return typeof obj === 'number' &&  obj === obj; // !Number.isNaN(source);
  };

  _type.isString = function (obj) { return _type(obj) == _TYPE._STRING; };

  _type.isArray = Array.isArray || function (obj) {
    return obj != null && obj instanceof Array;
  };

  _type.isObject = function (obj) { return _type(obj) == _TYPE._OBJECT || this.isDom(obj); };

  _type.isWindow = function (obj) { return obj != null && obj == obj.window };

  // true if `obj` is a DOM element(s)
  _type.isDom = function (obj) { 
    return typeof HTMLElement === 'object'
      ? obj instanceof HTMLElement
      : obj != null && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  };

  // true if obj is using `{}` or `new Object()`
  _type.isPlain = function (obj) {
    return this.isObject(obj) && !this.isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
  };

  // true if obj is `{}`
  _type.isEmpty = function (obj) {
    return this.isObject(obj) && Object.keys(obj).length == 0;
  };

  _type.isFunction = function (obj) { return _type(obj) == _TYPE._FUNCTION; };

  _type.isRegExp = function (obj) { return obj instanceof RegExp; };

  _type.isDate = function (obj) { return obj instanceof Date; };

  _type.isError = function (obj) { return obj instanceof Error; };

  // check for the object that likes array
  _type.likeArray = function (obj) {
  };

  return _type;
}();

export { dom as $dom, ajax as $ajax, type as $type };
