import ReactNativeHapticFeedback from 'react-native-haptic-feedback'


/// @name haptic
/// @description makes the phone shake a little bit
/// @param type
/// @param options enableVibrateFallback (on old ios), ignoreAndroidSystemSettings
/// @note trigger possibilities
/// 'selection',
/// 'impactLight',
/// 'impactMedium',
/// 'impactHeavy',
/// 'notificationSuccess',
/// 'notificationWarning',
/// 'notificationError',
export const haptic = {
  isEnabled: true,
  set (obj) {
    haptic.isEnabled = obj
  },
  trigger (method, options) {
    if (!haptic.isEnabled) return
    ReactNativeHapticFeedback.trigger(method, options)
  },
  error: (options) => haptic.trigger('notificationError', options),
  select: (options) => haptic.trigger('selection', options),
  success: (options) => haptic.trigger('notificationSuccess', options),
}
