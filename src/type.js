// Type Checker
//
const $type = function () {

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
  function type (obj) {
    return obj == null
      ? String(obj)
      : (toString.call(obj)).split(' ')[1].replace(']', '') || _TYPE._OBJECT;
      // : class2type[toString.call(obj)] || _TYPE._OBJECT;
  }
  
  type.isNull = function (obj) { return obj === null;}

  type.isUndefined = function (obj) { return obj === undefined }

  // true if obj is `null` or `undefined`
  type.isNone = function (obj) { return obj == null }

  type.isNaN = Number.isNaN || function (obj) { return obj != obj }

  type.isNumber = function (obj) {
    return typeof obj === 'number' &&  obj === obj; // !Number.isNaN(source);
  }

  type.isString = function (obj) { return type(obj) == _TYPE._STRING; }

  type.isArray = Array.isArray || function (obj) {
    return obj != null && obj instanceof Array;
  }

  type.isObject = function (obj) { return type(obj) == _TYPE._OBJECT || this.isDom(obj); }

  type.isWindow = function (obj) { return obj != null && obj == obj.window }

  // true if `obj` is a DOM element(s)
  type.isDom = function (obj) { 
    return typeof HTMLElement === 'object'
      ? obj instanceof HTMLElement
      : obj != null && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  }

  // true if obj is using `{}` or `new Object()`
  type.isPlain = function (obj) {
    return this.isObject(obj) && !this.isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
  }

  // true if obj is `{}`
  type.isEmpty = function (obj) {
    return this.isObject(obj) && Object.keys(obj).length == 0;
  }

  type.isFunction = function (obj) { return type(obj) == _TYPE._FUNCTION; }

  type.isRegExp = function (obj) { return obj instanceof RegExp; }

  type.isDate = function (obj) { return obj instanceof Date; }

  type.isError = function (obj) { return obj instanceof Error; }

  // check for the object that likes array
  type.likeArray = function (obj) {
  }

  return type;
}();

export default $type;