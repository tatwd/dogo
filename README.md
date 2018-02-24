# dogo
Some common javascript API.

## Usage

- download it in `dist/` dir.

- use cdn for dev:
  
  ```js
  <script src="https://raw.githack.com/tatwd/dogo/master/dist/dogo.iife.js"></script>
  ```

## API

- `dom(... selectors)`
  
  Get DOM object(s).

  ``` js
  let [divObj, ulObj] = dogo.dom('#div-obj', '.ul-obj').all();
  ```

- `ajax(url, [settings])`

  A common AJAX function.

  ``` js
  dogo.ajax('https://api.github.com/users/1')
    .then(res => res.getJson())
    .then(data => {
      console.log(data);
      // code here ..
    })
    .catch(error => console.log(error));
  ```

> Updating ...