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
  
  _type.isNull = function (obj) { return obj === null;}

  _type.isUndefined = function (obj) { return obj === undefined }

  // true if obj is `null` or `undefined`
  _type.isNone = function (obj) { return obj == null }

  _type.isNaN = Number.isNaN || function (obj) { return obj != obj }

  _type.isNumber = function (obj) {
    return typeof obj === 'number' &&  obj === obj; // !Number.isNaN(source);
  }

  _type.isString = function (obj) { return _type(obj) == _TYPE._STRING; }

  _type.isArray = Array.isArray || function (obj) {
    return obj != null && obj instanceof Array;
  }

  _type.isObject = function (obj) { return _type(obj) == _TYPE._OBJECT || this.isDom(obj); }

  _type.isWindow = function (obj) { return obj != null && obj == obj.window }

  // true if `obj` is a DOM element(s)
  _type.isDom = function (obj) { 
    return typeof HTMLElement === 'object'
      ? obj instanceof HTMLElement
      : obj != null && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  }

  // true if obj is using `{}` or `new Object()`
  _type.isPlain = function (obj) {
    return this.isObject(obj) && !this.isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
  }

  // true if obj is `{}`
  _type.isEmpty = function (obj) {
    return this.isObject(obj) && Object.keys(obj).length == 0;
  }

  _type.isFunction = function (obj) { return _type(obj) == _TYPE._FUNCTION; }

  _type.isRegExp = function (obj) { return obj instanceof RegExp; }

  _type.isDate = function (obj) { return obj instanceof Date; }

  _type.isError = function (obj) { return obj instanceof Error; }

  // check for the object that likes array
  _type.likeArray = function (obj) {
  }

  return _type;
}();

export default type;