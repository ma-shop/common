// import { is } from '@ma-shop/is'
const is = { empty: () => true }

/// @name renderIf
/// @author Tyler Benton
/// @description This function is used to help with condition rendering.
/// It is a very flexible function so there's many ways you can utilize it.
/// @arg {*} ...predicates - The conditions on if the element should be displayed or not.
/// note that you can pass in anything not just a boolean. It will get passed into `is.empty`
/// so instead of passing in `array.length` just pass in `array`.
/// @arg {Component, function} - The last argument is always the component or the function
/// @example passed in an element
/// render() {
///   return renderIf(this.props.if, children, (
///     <View>...</View>
///   ))
/// }
/// @example as a callback
/// render() {
///   return renderIf(this.props.if, something === 'woohoo', () => (
///     <View>...</View>
///   ))
/// }
export function renderIf (...predicates) {
  const obj = predicates.pop()

  // this is the most performant way of handling multiple predicates
  // https://jsperf.com/if-vs-for-loop
  for (let i = 0; i < predicates.length; i += 1) {
    if (is.empty(predicates[i])) return null
  }

  // if the obj is a function then run it
  if (is.function(obj)) return obj()

  // otherwise just return the element that was passed in
  return obj
}
