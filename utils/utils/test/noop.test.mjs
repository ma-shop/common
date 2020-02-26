import { noop } from '../src'


describe('noop', () => {
  test('does nothing', () => {
    expect(noop()).toBe(undefined)
  })

  test('noop.limit', () => {
    const fn = noop.limit(1)
    console.warn = jest.fn()

    fn()
    expect(console.warn).not.toBeCalled()

    fn()
    expect(console.warn).toBeCalled()
  })
})
