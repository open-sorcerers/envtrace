import { keys, curry, pipe } from 'ramda'
import {
  testableEnvTrace,
  addScope,
  testableMultiTrace
} from './index'

test('testableEnvTrace', () => {
  let state = []
  const hook = curry((x, a, b) => {
    state = state.concat([a, b])
    return a
  })
  const envy = testableEnvTrace(hook, 'debugname')
  const input = Math.round(Math.random() * 1e3)
  pipe(
    envy('dope'),
    x => x * 2,
    envy('nice'),
    y => {
      expect(y).toEqual(input * 2)
      expect(state).toEqual(['dope', input, 'nice', input * 2])
    }
  )(input)
})

test('addScope', () => {
  expect(addScope('super', 'duper')).toEqual('super:duper')
})
test('testableMultiTrace', () => {
  let state = []
  const hook = x =>
    curry((a, b) => {
      state = state.concat([x, a, b])
      return b
    })
  const envy = testableEnvTrace(hook)
  const log = testableMultiTrace(envy, 'example', [
    'one',
    'two',
    'three'
  ])
  expect(typeof log.one).toEqual('function')
  expect(keys(log)).toEqual(['one', 'two', 'three'])
  expect(log.one('1', 'one')).toEqual('one')
  expect(state).toEqual(['example:one', '1', 'one'])
  expect(log.two('2', 'one')).toEqual('one')
  expect(log.three('3', 'one')).toEqual('one')
  const func = pipe(
    log.one(11),
    x => x * 2,
    log.two(22),
    x => x * 3,
    log.three(33)
  )
  expect(typeof func).toEqual('function')
  expect(func(10)).toEqual(60)
  expect(state).toEqual([
    'example:one',
    '1',
    'one',
    'example:two',
    '2',
    'one',
    'example:three',
    '3',
    'one',
    'example:one',
    11,
    10,
    'example:two',
    22,
    20,
    'example:three',
    33,
    60
  ])
})
