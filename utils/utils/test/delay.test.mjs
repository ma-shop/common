import { delay } from '../src'


test('delay', () => {
  expect(delay()).toEqual(expect.any(Promise))
})
