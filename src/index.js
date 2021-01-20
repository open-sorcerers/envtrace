import {
  curry,
  identity as I,
  ifElse,
  map,
  mergeRight,
  pipe,
  reduce,
  when
} from 'ramda'
import debug from 'debug'
import { callBinary } from 'xtrace'

export const testableEnvTrace = curry((wrap, name) => {
  const logger = curry((a, b) => wrap(name)(a, b))
  const envLog = callBinary(logger)
  return envLog
})

export const envtrace = testableEnvTrace(debug)

export const addScope = curry((scope, x) => `${scope}:${x}`)

export const testableMultiTrace = curry(
  (customtrace, scope, loggers) => {
    const enscope = when(() => scope, addScope(scope))
    return pipe(
      ifElse(
        Array.isArray,
        reduce(
          (agg, x) =>
            mergeRight(agg, {
              [x]: enscope(x)
            }),
          {}
        ),
        map(enscope)
      ),
      map(customtrace)
    )(loggers)
  }
)
export const complextrace = testableMultiTrace(envtrace)
export const multitrace = complextrace(false)
