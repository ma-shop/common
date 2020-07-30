import {
  check,
  request,
  checkNotifications as rnpCheckNotifications,
  requestNotifications as rnpRequestNotifications,
} from 'react-native-permissions'
import { is } from '@ma-shop/is'

import { permissions } from '../src'


jest.mock('react-native-permissions', () => ({
  check: jest.fn().mockResolvedValue('granted'),
  checkNotifications: jest.fn().mockResolvedValue({ status: 'granted' }),
  PERMISSIONS: {
    ANDROID: {
      ACTIVITY_RECOGNITION: 'motion-android',
      ACCESS_FINE_LOCATION: 'locationAlways-android',
    },
    IOS: {
      MOTION: 'motion-ios',
      LOCATION_ALWAYS: 'locationAlways-ios',
      LOCATION_WHEN_IN_USE: 'locationWhenInUse-ios',
    },
  },
  request: jest.fn().mockResolvedValue('granted'),
  requestNotifications: jest.fn().mockResolvedValue({ status: 'granted' }),
  RESULTS: { GRANTED: 'granted' },
}))


describe('permissions', () => {
  test('requestNotifications', async () => {
    await permissions.requestNotifications()
    expect(rnpRequestNotifications).toBeCalledWith([ 'alert' ])
  })

  test('checkNotifications', async () => {
    const status = 'denied'

    is.ios = jest.fn(() => false)
    rnpCheckNotifications.mockResolvedValue({ status })

    const result = await permissions.checkNotifications()

    expect(rnpCheckNotifications).toBeCalled()
    expect(result).toBe(status)
  })

  describe('requestMotion', () => {
    test('android requests correct permission', async () => {
      is.ios = jest.fn(() => false)

      await permissions.requestMotion()
      expect(request).toBeCalledWith('motion-android')
    })

    test('ios requests correct permission', async () => {
      is.ios = jest.fn(() => true)

      await permissions.requestMotion()

      expect(request).toBeCalledWith('motion-ios')
    })
  })

  describe('requestLocation', () => {
    test('android requests correct permission and returns status', async () => {
      const status = 'unavailable'
      request.mockResolvedValue(status)
      is.ios = jest.fn(() => false)

      const result = await permissions.requestLocation()

      expect(request).toBeCalledWith('locationAlways-android')
      expect(result).toBe(status)
    })

    test('ios requests correct permission and returns granted', async () => {
      const status = 'granted'
      request.mockResolvedValue(status)
      is.ios = jest.fn(() => true)

      const result = await permissions.requestLocation()

      expect(request).toBeCalledWith('locationAlways-ios')
      expect(result).toBe(status)
    })

    test('ios returns check of when in use if always not granted', async () => {
      const always = 'blocked'
      const whenInUse = 'granted'
      request.mockResolvedValue(always)
      check.mockResolvedValue(whenInUse)
      is.ios = jest.fn(() => true)

      const result = await permissions.requestLocation()

      expect(request).toBeCalledWith('locationAlways-ios')
      expect(check).toBeCalledWith('locationWhenInUse-ios')
      expect(result).toBe(whenInUse)
    })
  })


  describe('checkLocation', () => {
    test('android checks correct permission and returns status', async () => {
      const status = 'unavailable'
      check.mockResolvedValue(status)
      is.ios = jest.fn(() => false)

      const result = await permissions.checkLocation()

      expect(check).toBeCalledWith('locationAlways-android')
      expect(result).toBe(status)
    })

    test('ios requests correct permission and returns granted', async () => {
      const status = 'granted'
      check.mockResolvedValue(status)
      is.ios = jest.fn(() => true)

      const result = await permissions.checkLocation()

      expect(check).toBeCalledWith('locationAlways-ios')
      expect(result).toBe(status)
    })

    test('ios returns check of when in use if always not granted', async () => {
      const always = 'blocked'
      const whenInUse = 'granted'
      check.mockImplementation((permission) => {
        if (permission === 'locationAlways-ios') return always
        if (permission === 'locationWhenInUse-ios') return whenInUse
      })
      is.ios = jest.fn(() => true)

      const result = await permissions.checkLocation()

      expect(check).toBeCalledWith('locationAlways-ios')
      expect(check).toBeCalledWith('locationWhenInUse-ios')
      expect(result).toBe(whenInUse)
    })
  })

  describe('Storage', () => {
    test('check storage', async () => {
      const status = 'granted'
      check.mockResolvedValue(status)

      const result = await permissions.checkStorage()

      expect(check).toBeCalledWith('locationAlways-android')
      expect(result).toBe(status)
    })

    test('request storage', async () => {
      const status = 'unavailable'
      request.mockResolvedValue(status)

      const result = await permissions.requestStorage()

      expect(request).toBeCalledWith('locationAlways-android')
      expect(result).toBe(status)
    })
  })
})
