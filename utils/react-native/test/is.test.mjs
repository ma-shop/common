import { Platform } from 'react-native'
import { is } from '@ma-shop/is'

import '../src/is'


describe('is', () => {
  test('ios', () => {
    Platform.OS = 'ios'

    expect(is.ios()).toBeTruthy()

    expect(is.android()).toBeFalsy()
  })

  test('android', () => {
    Platform.OS = 'android'

    expect(is.ios()).toBeFalsy()

    expect(is.android()).toBeTruthy()
  })
})
