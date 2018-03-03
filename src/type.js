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

export default $type;