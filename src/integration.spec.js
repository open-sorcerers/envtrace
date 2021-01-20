import { slice, map, prop, pipe, split, trim } from 'ramda'
// import { trace } from 'xtrace'
// import { runTest } from 'quizzically'
import { runTest } from './tester'

const throwIt = e => {
  throw e
}

const runner = runTest({
  select: prop('stderr'),
  cmd: `nps`,
  expect,
  args: [`run`]
})
test(`example`, () =>
  runner(
    throwIt,
    pipe(
      split('\n'),
      slice(3, Infinity),
      map(pipe(split(' '), map(trim), slice(1, Infinity))),
    ),
    [
      ['example', 'input', '10'],
      ['example', 'twice', '20'],
      ['example', 'deets', '60'],
      ['example', 'nice', '240'],
      ['example', 'output', '1200'],
      ['example:info', 'input', '10'],
      ['example:warn', 'twice', '20'],
      ['example:detail', 'deets', '60'],
      ['example:error', 'nice', '240'],
      ['example:info', 'output', '1200'],
      ['example:info', 'input', '10'],
      ['example:warn', 'twice', '20'],
      ['example:detail', 'deets', '60'],
      ['example:error', 'nice', '240'],
      ['example:info', 'output', '1200']
    ]
  ))
