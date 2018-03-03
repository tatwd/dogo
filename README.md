# dogo

Some common javascript API.

## Usage

- download it in `dist/` dir.

- use cdn for dev:
  
  ```html
  <script src="https://raw.githack.com/tatwd/dogo/master/dist/dogo.iife.js"></script>
  ```

## Dev

- Install Rollup CLI.

  ``` bash
  $ npm i -g rollup
  ```

- Install depandencies and run test script.

  ``` bash
  $ npm i
  $ npm test
  ```

## API

- **$dom(... selectors)**
  
  Get DOM object(s).

  ``` js
  let [divObj, ulObj] = dogo.$dom('#div-obj', '.ul-obj').all();
  ```

- **$ajax(url, [settings])**

  A common AJAX function.

  ``` js
  dogo.$ajax('https://api.github.com/users/1')
    .then(res => res.getJson())
    .then(data => {
      console.log(data);
      // code here ..
    })
    .catch(error => console.log(error));
  ```

- **$type**

  A type checker.

  ``` js
  dogo.$type.is('string'); // String

  dogo.$type.isObject({}); // Object
  ```
## License

[MIT](https://opensource.org/licenses/MIT)