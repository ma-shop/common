import { ui } from '@ma-shop/utils'

import { em } from './font'

/// @name spacing
/// @description this handles the spacing and returns the appropriate pixel value
/// @arg {string, number} value [1] - the ratio to space by
/// @returns {number} the computed spacing value,
/// if no argument was passed in the default spacing is returned instead
export function spacing (value = 1, _) {
  const base = _ || ui.fontSize
  const sizes = {
    xsmall: 0.25,
    small: 0.5,
    medium: 1,
    large: 1.5,
    xlarge: 2,
  }

  if (typeof value === 'string') {
    const size = sizes[value]

    if (!size) {
      console.debug('you did not pass in a valid size to spacing()', value)
      // return a default size
      return em(1)
    }

    return em(size, base)
  }

  if (typeof value !== 'number') {
    console.debug('you did not pass in a valid value argument', value)
    // return a default size
    return em(1)
  }

  return em(value, base)
}
