import { PixelRatio } from 'react-native'
import { clamp } from '@ma-shop/utils'

/// @name accessibilityStates
/// @author Tyler Benton
/// @description This is used to handle the accessibilityStates prop in a better way
/// since dealing with an array of strings is a weird implementation
/// @arg {object} obj = The states that you want to set
/// @example
///
/// render () {
///   const { isDisabled } = this.state
///
///   return (
///     <View
///       accessible
///       accessibilityStates={accessibilityStates({ isDisabled })}
///     />
///   )
/// }
export function accessibilityStates (obj) {
  return Object.keys(obj)
    .map((key) => obj[key] && key.replace(/^is/, '').toLowerCase())
    .filter(Boolean)
}


/// @name fontScale
/// @author Tyler Benton
/// @description This allows you to fake the font scaling if it's needed.
/// This is typically used with Images but it can be used in other cases if needed.
/// @note When you change the font scale in the accessibility inspector it will not show changes
/// on the screen like the actual fonts show. To see changes take affect you will have to
/// reload the screen.
export function fontScale ({
  allowFontScaling = true,
  noFontScaling = false,
  maxFontSizeMultiplier = 2.25,
  minimumFontScale = 1,
} = {}) {
  if (!allowFontScaling || noFontScaling) return 1
  return clamp(PixelRatio.getFontScale(), minimumFontScale, maxFontSizeMultiplier)
}
