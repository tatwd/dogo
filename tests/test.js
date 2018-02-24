!function($) {
  
  // dom function test
  let [header, content] = $.dom('#header', '.content').first();
  console.log(header, content);

  // ajax function test
  $.ajax('https://api.github.com/users/123')
    .then(res => res.getJson())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));

}(dogo);