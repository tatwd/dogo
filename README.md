# dogo

Some common javascript API.

## Dev

- Install depandencies and run test script.

  ``` bash
  $ npm install
  $ npm test
  ```


## Usage

- download it in `dist/` dir.

- use cdn for dev:

  ```html
  <script src="https://raw.githack.com/tatwd/dogo/master/dist/dogo.iife.js"></script>
  <script>
    !function ({ $dom, $ajax, $type }) {
      // coding ...
    }(dogo);
  </script>
  ```

- if in node.js env

  ``` js
  import { $dom, $ajax, $type } from './dogo'
  ```  

## API

- **$dom(... selectors)**
  
  Get DOM object(s).

  ``` js
  let [divObj, ulObj] = $dom('#div-obj', '.ul-obj').all();
  ```

- **$ajax(url, [settings])**

  A common AJAX function.

  ``` js
  $ajax('https://api.github.com/users/1')
    .then(res => res.getJson()) // or getText()
    .then(data => {
      // code here ..
    })
    .catch(error => console.log(error));
  ```

- **$type**

  A type checker.

  ``` js
  $type('foo'); // String

  $type.isObject({}); // true
  ...
  ```
## License

[MIT](https://opensource.org/licenses/MIT)
