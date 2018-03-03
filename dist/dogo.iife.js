var dogo = (function () {
'use strict';

// DOM 对象的获取
//
function $dom (... selectors) {

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

// 简单的 AJAX 函数封装
//
function $ajax (
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

// 类型判断
//

const $type = function (source) {
  
  // common type object
  const _TYPE_ = {
    NUMBER:    'Number',
    STRING:    'String',
    OBJECT:    'Object',
    FUNCTION:  'Function',
    ARRAY:     'Array',
    REGEXP:    'RegExp',
    UNDEFINED: 'undefined',
    NULL:      'null',
    NAN:       'NaN'
  };
  
  // Type Class
  class Type {
    constructor () {
    }
  
    // get a type string
    is (source) {
      if (this.isNull(source)) return _TYPE_.NULL;
      if (this.isUndefined(source)) return _TYPE_.UNDEFINED;
      if (this.isNumber(source)) return _TYPE_.NUMBER;
      if (this.isNaN(source)) return _TYPE_.NAN;
      if (this.isString(source)) return _TYPE_.STRING;
      if (this.isArray(source)) return _TYPE_.ARRAY;
      if (this.isObject(source)) return _TYPE_.OBJECT;
      if (this.isFunction(source)) return _TYPE_.FUNCTION;
      if (this.isRegExp(source)) return _TYPE_.REGEXP;
    }
  
    // check for null
    isNull (source) {
      // null is a objec but not instanced of Object  
      return typeof source === 'object' && !(source instanceof Object);
    }
  
    // check for undefined
    isUndefined (source) {
      return typeof source === 'undefined';
    }

    // check for Number
    isNumber (source) {
      return typeof source === 'number' && !Number.isNaN(source);
    }
  
    // check for NaN
    isNaN (source) {
      return source !== source; // or Number.isNaN(source)
    }

    // check for String
    isString (source) {
      return typeof source === 'string';
    }
  
    // check for Function
    isFunction (source) {
      return typeof source === 'function';
    }
  
    // check for RegExp
    isRegExp (source) {
      return source 
        ? source.constructor === RegExp
        : false;
    }
  
    // check for Array
    isArray (source) {
      return Array.isArray(source);
    }

    // check for Object
    isObject (source) {
      return source 
        ? ( !this.isArray(source)
          && !this.isRegExp(source)
          && typeof source === 'object') 
        : false;
    }
  
  }

  return new Type();
}();

const dogo = {
  $dom,
  $ajax,
  $type
};

return dogo;

}());
