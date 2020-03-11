import { Platform } from 'react-native'
import { is } from '@ma-shop/is'


/// @name ios
/// @description This will check if the current device is on ios
/// @returns {boolean}
is.ios = () => Platform.OS === 'ios'

/// @name android
/// @description This will check if the current device is on android
/// @arg {array, string} - The types to test against
/// @returns {boolean}
is.android = () => Platform.OS === 'android'
