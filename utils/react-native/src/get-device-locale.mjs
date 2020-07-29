import { NativeModules } from 'react-native'
import { is } from '@ma-shop/is'

/// @name getDeviceLocale
/// @description This function will get the current locale for where the device is.
/// @returns {string} - eg. en-US
// @todo Move this to the @ma-shop/react-native library
export function getDeviceLocale () {
  let deviceLocale

  if (is.ios()) {
    deviceLocale = NativeModules.SettingsManager.settings.AppleLocale
    if (!deviceLocale) {
      // iOS 13 workaround, take first of AppleLanguages array
      [ deviceLocale ] = NativeModules.SettingsManager.settings.AppleLanguages
    }
  } else {
    deviceLocale = NativeModules.I18nManager.localeIdentifier
  }

  // device locale isn't available; return en-us
  if (!deviceLocale) return 'en-US'

  const localePieces = deviceLocale.split('_')

  if (localePieces.length !== 2) return 'en-US'

  const language = localePieces[0].toLowerCase()
  const country = localePieces[1].toUpperCase()
  return `${language}-${country}`
}
