import { Platform } from 'react-native'
import Device from 'react-native-device-info'
import { is } from '@ma-shop/is'


/// @name ios
/// @description This will check if the current device is on ios
/// @returns {boolean}
is.ios = () => Platform.OS === 'ios'

is.tablet = () => Device.isTablet()

/// @name type
/// @description This will check if the current device is an iphone
/// @arg {string} version - A specific version of the iphone
/// @returns {boolean}
/// @example
/// is.iphone()
/// is.iphone('x')
is.iphone = (version) => {
  const model = Device.getModel().toLowerCase()

  if (!model.includes('iphone')) return false

  if (is.null(version)) return true

  const regex = new RegExp(`${version.toLowerCase()}$`)

  return regex.test(model)
}

/// @name android
/// @description This will check if the current device is on android
/// @arg {array, string} - The types to test against
/// @returns {boolean}
is.android = () => Platform.OS === 'android'
