const { pipe } = require('ramda')
const N = require('./envtrace')

const { envtrace } = N

const simple = envtrace('example')

const example1 = () => {
  return pipe(
    simple('input'),
    x => x * 2,
    simple('twice'),
    x => x * 3,
    simple('deets'),
    x => x * 4,
    simple('nice'),
    x => x * 5,
    simple('output')
  )(Math.random() * 1e5)
}
example1()
