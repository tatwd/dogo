!function({ $dom, $ajax, $type }) {
  
  // dom function test
  let [header, content, foo] = $dom('#header', '.content', '.foo').at(1, 2).of(1);
  console.log(header, content, foo);

  //  $.dom('#header').first();
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
  ];

  datas.forEach(data => {
    let type = $type.is(data);
    console.log(`The type of \`${data}\` is a ${type}.`);
  });

  // console.log($type.isObject({}))


}(dogo);