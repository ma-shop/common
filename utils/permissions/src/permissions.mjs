import {
  check,
  request,
  RESULTS as results,
  checkNotifications as rnpCheckNotifications,
  PERMISSIONS as rnpPermissions,
  requestNotifications as rnpRequestNotifications,
} from 'react-native-permissions'
import { is } from '@ma-shop/is'


function getMotionPermission () {
  let permission = rnpPermissions.ANDROID.ACTIVITY_RECOGNITION
  if (is.ios()) {
    permission = rnpPermissions.IOS.MOTION
  }

  return permission
}
/// @name getLocationPermission
/// @author Matt Murtagh
/// @description
/// Gets the appropriate location permission depending on OS
/// @returns {string} - the OS specific location permission
function getLocationPermission () {
  let permission = rnpPermissions.ANDROID.ACCESS_FINE_LOCATION
  if (is.ios()) {
    permission = rnpPermissions.IOS.LOCATION_ALWAYS
  }

  return permission
}

export const permissions = {
  /// @name requestNotifications
  /// @author Matt Murtagh
  /// @description
  /// Requests the user for permission to send notifications.
  /// @returns {promise} - promise that resolves to a string representation of the
  /// notification permission (unavailable, denied, blocked, granted)
  async requestNotifications () {
    return (await rnpRequestNotifications([ 'alert' ]))?.status
  },

  /// @name requestLocation
  /// @author Matt Murtagh
  /// @description
  /// Requests the user for location permissions.
  /// @returns {string} - string representation of the
  /// location permission (unavailable, denied, blocked, granted)
  async requestLocation () {
    const status = await request(getLocationPermission())

    if (!is.ios() || status === results.GRANTED) return status

    // Even though we request Location Always, the user can choose When in Use.
    // If they do this on iOS, the request will return as 'blocked', but checking the When in Use
    // permission will return 'granted'.
    return check(rnpPermissions.IOS.LOCATION_WHEN_IN_USE)
  },

  /// @name requestMotion
  /// @author Matt Murtagh
  /// @description
  /// Requests the user for motion and activity permission
  /// @returns {string} - string representation of the
  /// notification permission (unavailable, denied, blocked, granted)
  requestMotion () {
    return request(getMotionPermission())
  },

  /// @name checkNotifications
  /// @author Matt Murtagh
  /// @description
  /// Checks the notification permission
  /// @returns {string} - string representation of the
  /// notification permission (unavailable, denied, blocked, granted)
  async checkNotifications () {
    return (await rnpCheckNotifications())?.status
  },

  /// @name checkLocation
  /// @author Matt Murtagh
  /// @description
  /// Checks the location permission
  /// @returns {string} - string representation of the
  /// location permission (unavailable, denied, blocked, granted)
  async checkLocation () {
    const status = await check(getLocationPermission())

    if (!is.ios() || status === results.GRANTED) return status

    // Even though we check Location Always, the user can choose When in Use.
    // If they do this on iOS, the request will return as 'blocked', but checking the When in Use
    // permission will return 'granted'.
    return check(rnpPermissions.IOS.LOCATION_WHEN_IN_USE)
  },

  /// @name checkStorage
  /// @author William Lacy
  /// @description
  /// Checks the External Storage Permission
  /// @returns {string} - string representation of the
  /// storage permission (unavailable, denied, blocked, granted)
  checkStorage () {
    // No equivalent ios permission
    if (is.ios()) return 'granted'

    return check(rnpPermissions.ANDROID.WRITE_EXTERNAL_STORAGE)
  },

  /// @name requestStorage
  /// @author William Lacy
  /// @description
  /// Requests External Storage Permission
  /// @returns {string} - string representation of the
  /// storage permission (unavailable, denied, blocked, granted)
  /// No equivalent ios permission
  requestStorage () {
    return request(rnpPermissions.ANDROID.WRITE_EXTERNAL_STORAGE)
  },
}
