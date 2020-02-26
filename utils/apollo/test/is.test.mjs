import '../src/is'
import { is } from '@ma-shop/is'


describe('network', () => {
  // 5 isn't a valid network status so no real reason to test with it
  test('loading', () => {
    expect(is.network.loading(null)).toBeFalsy()
    expect(is.network.loading(2)).toBeFalsy()
    expect(is.network.loading(3)).toBeFalsy()
    expect(is.network.loading(4)).toBeFalsy()
    expect(is.network.loading(6)).toBeFalsy()
    expect(is.network.loading(7)).toBeFalsy()
    expect(is.network.loading(8)).toBeFalsy()

    expect(is.network.loading(1)).toBeTruthy()
  })

  test('fetching', () => {
    expect(is.network.fetching(null)).toBeFalsy()
    expect(is.network.fetching(1)).toBeFalsy()
    expect(is.network.fetching(2)).toBeFalsy()
    expect(is.network.fetching(4)).toBeFalsy()
    expect(is.network.fetching(6)).toBeFalsy()
    expect(is.network.fetching(7)).toBeFalsy()
    expect(is.network.fetching(8)).toBeFalsy()

    expect(is.network.fetching(3)).toBeTruthy()
  })

  test('refetching', () => {
    expect(is.network.refetching(null)).toBeFalsy()
    expect(is.network.refetching(3)).toBeFalsy()
    expect(is.network.refetching(6)).toBeFalsy()
    expect(is.network.refetching(7)).toBeFalsy()
    expect(is.network.refetching(8)).toBeFalsy()

    expect(is.network.refetching(1)).toBeTruthy()
    expect(is.network.refetching(2)).toBeTruthy()
    expect(is.network.refetching(4)).toBeTruthy()
  })

  test('finished', () => {
    expect(is.network.finished(null)).toBeFalsy()
    expect(is.network.finished(1)).toBeFalsy()
    expect(is.network.finished(2)).toBeFalsy()
    expect(is.network.finished(3)).toBeFalsy()
    expect(is.network.finished(4)).toBeFalsy()
    expect(is.network.finished(6)).toBeFalsy()

    expect(is.network.finished(7)).toBeTruthy()
    expect(is.network.finished(8)).toBeTruthy()
  })

  test('success', () => {
    expect(is.network.success(null)).toBeFalsy()
    expect(is.network.success(1)).toBeFalsy()
    expect(is.network.success(2)).toBeFalsy()
    expect(is.network.success(3)).toBeFalsy()
    expect(is.network.success(4)).toBeFalsy()
    expect(is.network.success(6)).toBeFalsy()
    expect(is.network.success(8)).toBeFalsy()

    expect(is.network.success(7)).toBeTruthy()
  })

  test('error', () => {
    expect(is.network.error(null)).toBeFalsy()
    expect(is.network.error(1)).toBeFalsy()
    expect(is.network.error(2)).toBeFalsy()
    expect(is.network.error(3)).toBeFalsy()
    expect(is.network.error(4)).toBeFalsy()
    expect(is.network.error(6)).toBeFalsy()
    expect(is.network.error(7)).toBeFalsy()

    expect(is.network.error(8)).toBeTruthy()
  })
})
