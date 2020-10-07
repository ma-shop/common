import { Children, cloneElement, isValidElement } from 'react'
import { mapProps, ui } from '@ma-shop/utils'

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


/// @name noSpacing
/// @author Tyler Benton
/// @description
/// `noSpacing` is used to add or remove marginTop based
/// on the `noSpacing` prop that's passed in
/// @example
/// function Something({ children, style, ...props }) {
///   return (
///     <View style={[ noSpacing(props), style ]}>
///       {children}
///     </View>
///   )
/// }
export function noSpacing ({ noSpacing: noSpacingProp, styles: extraStyles }, value = spacing()) {
  const styles = { ...extraStyles }

  if (!styles.marginTop) {
    styles.marginTop = value
  }
  if (noSpacingProp) {
    styles.marginTop = 0
  }

  return styles
}

/// @name noChildSpacing
/// @author Tyler Benton
/// @description
/// This will set the `noSpacing` prop to true on all the children that are passed to it
/// @example
/// function Something({ children }) {
///   return (
///     <View>
///       {noChildSpacing(children)}
///     </View>
///   )
/// }
export function noChildSpacing (children, extraProps = {}) {
  return mapProps(children, {
    noSpacing: true,
    ...extraProps,
  })
}

/// @name noFirstChildSpacing
/// @author Tyler Benton
/// @description
/// This will set the `noSpacing` prop to `true` on the first child in the list
/// @example
/// function Something({ children }) {
///   return (
///     <View>
///       {noFirstChildSpacing(children)}
///     </View>
///   )
/// }
export function noFirstChildSpacing (obj, extraProps = {}) {
  const children = Children.toArray(obj)
  if (!isValidElement(children[0])) return children

  const firstChild = cloneElement(children[0], {
    key: children[0]?.key || 'first-child',
    noSpacing: true,
    ...extraProps,
  })

  return [ firstChild, ...children.slice(1) ]
}
