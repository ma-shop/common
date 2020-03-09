/// @name setStateAsync
/// @description This is used to be able to set the state
/// and return a promise for a promise chain to make code easier
/// to follow
/// @note this works exactly like `this.setState`, only difference
/// is that it returns a promise
/// @arg {object, function} state - the way to set the state
/// @async
/// @example
/// class Something extends PureComponent {
///   setStateAsync = setStateAsync
///
///   async something () {
///     await this.setStateAsync({ something: true })
///     await this.somethingElse()
///   }
/// }
export function setStateAsync (state) {
  return new Promise((resolve) => {
    // this guarantees that the setState is async so you don't get any
    // false positive tests because it won't run the setState until
    // the next tick
    // aka this type of test would pass (no it's not real but you should get the idea)
    // ```
    // this.state.something = false
    // const actual = this.setStateAsync({ something: true })
    // expect(this.state.something).toBe(false)
    // await actual
    // expect(this.state.something).toBe(true)
    // ```
    this.setState(state, resolve)
  })
}
