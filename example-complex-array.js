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
