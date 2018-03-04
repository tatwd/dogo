// AJAX Encapsulation
//
export default function (
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
    }

    xhr.timeout = timeout;
    xhr.responseType = responseType;

    // set request header
    for (let item in header) {
      xhr.setRequestHeader(item, header[item]);
    }

    xhr.send(data);
  });
}
