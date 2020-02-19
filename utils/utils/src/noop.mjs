/// @name noop
/// @author Tyler Benton
/// @description
/// Use this `noop` instead of putting in your own empty function
export function noop () {}

/// @name limit
/// @description This function is used to set a limit on the number of times a noop can be called
/// @arg {number} limit [5] - The number of times a function is allowed
/// to be called before a warning is thrown
/// @returns {function} the noop function that keeps track of the count
/// @example
/// componentWillUnmount () {
///   this.setState = noop.limit()
/// }
noop.limit = function noopLimit (limit = 5) {
  let count = 0

  return () => {
    // eslint-disable-next-line no-plusplus
    if (++count > limit) {
      console.warn(`possible memory leak noop was called ${count} times`)
    }
  }
}
