# envtrace

> all the convenience of `xtrace` + `debug` in a single package

1. Let's say you want to be able to add logging a la `debug` and your application is called *dope* :

```js
DEBUG=dope node my-file.js
```

2. Use `envtrace` just like you would use `debug`:

```js
// my-file.js
import { pipe } from 'ramda'
import { envtrace } from 'envtrace'

const ntrace = envtrace('dope')

const myFunction = pipe(
  ntrace('input'),
  x => x * 2,
  ntrace('output')
)
```

3. Wanna use multiple loggers? That's easy:

```js
// example-complex.js

const { pipe } = require('ramda')
const N = require('./envtrace')

const log = N.complextrace('example', [
  'info',
  'warn',
  'detail',
  'error'
])

const example = () => {
  pipe(
    log.info('input'),
    x => x * 2,
    log.warn('twice'),
    x => x * 3,
    log.detail('deets'),
    x => x * 4,
    log.error('nice'),
    x => x * 5,
    log.info('output')
  )(10)
}
example()
```

Then the above can be run with `DEBUG=example:* node example-complex.js` and it will print:

```
example:info input 10 +0ms
example:warn twice 20 +0ms
example:detail deets 60 +0ms
example:error nice 240 +0ms
example:info output 1200 +3ms
```
