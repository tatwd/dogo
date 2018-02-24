// DOM 对象的获取
//
export default function (... selectors) {

  // get dom objects
  function getDOM(selectors) {
    return selectors.map(selector =>
      selector.startsWith('#') 
        ? document.querySelector(selector)
        : document.querySelectorAll(selector)
    );
  }

  class DOM {
    constructor(selectors) {
      this.selectors = selectors;
      this.domArr = getDOM(selectors);
      this.filter = {};
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

    at (atIndex = null) {
      this.filter.at = atIndex;
      return this;
    }

    item (itemIndex = null) {
      this.filter.item = itemIndex;

      return this.domArr.map((dom, index) =>
        this.filter.at && index === this.filter.at
          ? dom[itemIndex]
          : dom
      )
    }
    // other
  }

  return new DOM(selectors);
};
