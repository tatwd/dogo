!function($) {
  
  // dom function test
  let [header, content, foo] = $.dom('#header', '.content', '.foo').at(1, 2).of(1);
  console.log(header, content, foo);

  // let foo = $.dom('#header').first();
  // console.log(foo);

  // ajax function test
  $.ajax('https://api.github.com/users/123')
    .then(res => res.getJson())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));

}(dogo);