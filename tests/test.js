!function({ $dom, $ajax, $type }) {
  
  // dom function test
  let [header, content, foo] = $dom('#header', '.content', '.foo').at(1, 2).of(1, 1);
  console.log(header, content, foo);

  // $.dom('#header').first();
  // console.log(foo);

  // ajax function test
  $ajax('https://api.github.com/users/123')
    .then(res => res.getJson())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));

  // test for $type
  let datas = [
    123456,
    'this is a string',
    NaN,
    { id: 1 , msg: 'this is object' },
    ['this is a array'],
    null,
    undefined,
    /RegExp/,
    function fn() {},
    new Error(),
    new Date(),
    window,
    document,
    document.body,
    HTMLElement,
    HTMLHeadElement,
    header,
    {}
  ];

  let msgs = [];

  let trueOrfalse = flag => flag ? '√': 'x';

  datas.forEach((data, index) => {

    msgs.push({
      value: data,
      type: $type(data),
      isNull: $type.isNull(data),
      isUndefined: $type.isUndefined(data),
      isNone: $type.isNone(data),      
      isNaN: $type.isNaN(data), 
      isNumber: $type.isNumber(data),
      isString: $type.isString(data),
      isArray: $type.isArray(data),
      isObject: $type.isObject(data),
      isWindow: $type.isWindow(data),
      isDom: $type.isDom(data),
      isPlain: $type.isPlain(data),
      isEmpty: $type.isEmpty(data),
      isFunction: $type.isFunction(data),
      isRegExp: $type.isRegExp(data), 
      isDate: $type.isDate(data), 
      isError: $type.isError(data)
    })
  });

  console.table(msgs);

}(dogo);