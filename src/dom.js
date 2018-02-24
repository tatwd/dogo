// DOM 对象的获取
//
export default function (... selectors) {

  // get dom objects
  function getDOM(selectors) {
    return selectors.map(selector => 
      selector.startsWith('#') 
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
                _of[atIndex].forEach(item => _dom.push(dom[item])),
                _dom.length === 1 ? _dom[0] : _dom
              )
              : dom[_of[atIndex]];
          } else {
            return dom;
          }
        });
    }

    // other
  }

  return new DOM(selectors);
};
