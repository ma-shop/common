import { nav } from '../src/navigation'


const mockNavigation = (overrides = {}) => {
  const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
    setParams: jest.fn(),
    setOptions: jest.fn(),
    isFocused: jest.fn(() => true),
    addListener: jest.fn((event, callback) => {
      return () => navigation.removeListener(event, callback)
    }),
    removeListener: jest.fn(),
    dispatch: jest.fn(),
    reset: jest.fn(),
    ...overrides,
  }

  nav.set(navigation)
}

describe('navigation', () => {
  beforeEach(() => {
    mockNavigation()

    // reset this before every test
    nav.resetRoute = null
  })

  test('set', () => {
    nav.set('woohoo')

    expect(nav.navigation).toBe('woohoo')
  })

  test('to', () => {
    nav.to('Login', { id: 'woohoo' })

    expect(nav.navigation.navigate).toBeCalledWith('Login', { id: 'woohoo' })
  })

  test('back', () => {
    nav.back()

    expect(nav.navigation.goBack).toBeCalledWith(null)

    nav.back('Login')

    expect(nav.navigation.goBack).toBeCalledWith('Login')
  })

  test('close', () => {
    nav.close()

    expect(nav.navigation.goBack).toBeCalledWith(null)

    nav.close('Login')

    expect(nav.navigation.goBack).toBeCalledWith(null)
  })

  test('replace', () => {
    nav.replace('Login', { id: 'woohoo' })

    expect(nav.navigation.replace).toBeCalledWith('Login', { id: 'woohoo' })
  })

  test('setParams', () => {
    nav.setParams({ id: 'woohoo' })

    expect(nav.navigation.setParams).toBeCalledWith({ id: 'woohoo' })
  })

  test('setOptions', () => {
    nav.setOptions({ id: 'woohoo' })

    expect(nav.navigation.setOptions).toBeCalledWith({ id: 'woohoo' })
  })

  test('isFocused', () => {
    expect(nav.isFocused).toBeTruthy()
    expect(nav.navigation.isFocused).toBeCalled()
  })

  test('on', () => {
    const fn = () => 'woohoo'
    const unsubscribe = nav.on('focus', fn)

    expect(nav.navigation.addListener).toBeCalled()
    expect(unsubscribe).toEqual(expect.any(Function))

    unsubscribe()
    expect(nav.navigation.removeListener).toBeCalled()
  })

  test('dispatch', () => {
    nav.dispatch('woohoo')

    expect(nav.navigation.dispatch).toBeCalledWith('woohoo')
  })

  test('setResetRoute', () => {
    expect(nav.resetRoute).toBe(null)

    nav.setResetRoute('DefaultRoute')

    expect(nav.resetRoute).toBe('DefaultRoute')
  })

  describe('reset', () => {
    beforeEach(() => {
      nav.setResetRoute('DefaultRoute')
    })

    test('with default', () => {
      nav.reset()

      expect(nav.navigation.reset.mock.calls[0]).toMatchSnapshot()
    })

    test('with override', () => {
      nav.reset('NoneDefaultRoute')

      expect(nav.navigation.reset.mock.calls[0]).toMatchSnapshot()
    })
  })
})
