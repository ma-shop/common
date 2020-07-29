import { CommonActions } from '@react-navigation/native'



export const nav = (() => {
  class Navigation {
    set (obj) {
      this.navigation = obj
    }

    ///# @name to
    ///# @description navigate *to* a page
    ///# https://reactnavigation.org/docs/en/navigation-prop.html#navigate-link-to-other-screens
    ///# @example
    ///# nav.to('ProductDetail', { prodId: 13009 })
    to (...args) {
      this.navigation.navigate(...args)
    }

    ///# @name back
    ///# @description navigate back to a page
    ///# https://reactnavigation.org/docs/en/navigation-prop.html#goback-close-the-active-screen-and-move-back
    ///# @arg {null, string} screen [null] - The screen to go back to.
    ///# If it's null it will just go back to the previous screen
    ///# @alias `nav.close()`
    ///# @example
    ///# // goes back to previous page
    ///# nav.back()
    ///# // goes back until it gets to the product detail page
    ///# nav.back('ProductDetail')
    back = (screen = null) => this.navigation.goBack(screen)

    close = () => this.back(null)

    ///# @name replace
    ///# @description replace the current page without adding it to the stack
    ///# it uses the same arguments as `this.nav.to`
    ///# https://reactnavigation.org/docs/en/navigation-prop.html#replace
    ///# @example
    ///# this.nav.replace('ProductDetail', { prodId: 13009 })
    replace (...args) {
      this.navigation.replace(...args)
    }

    ///# @name params
    ///# @description shortcut to get the params. Also it will always return an object
    ///# @example
    ///# this.nav.params
    ///# @getter
    get params () {
      return {

        // this is really stupid but required for anything under the TabBar to get params
        ...this.parent?.params || {},
        ...this.navigation.state?.params || {},
      }
    }

    ///# @name state
    ///# @description returns the current state
    ///# @example
    ///# this.nav.state
    ///# @getter
    get state () {
      return this.navigation.state || {}
    }

    ///# @name setParams
    ///# @description sets the params on the current view
    ///# https://reactnavigation.org/docs/en/navigation-prop.html#setparams-make-changes-to-route-params
    ///# @example
    ///# this.nav.setParams({})
    setParams (params) {
      this.navigation.setParams(params)
    }

    ///# @name setParams
    ///# @description lets you know if the current view is focused or not
    ///# https://reactnavigation.org/docs/en/navigation-prop.html#isfocused-query-the-focused-state-of-the-screen
    ///# @example
    ///# this.nav.isFocused
    ///# @getter
    get isFocused () {
      return this.navigation.isFocused()
    }

    ///# @name on
    ///# @description lets you know if the current view is focused or not
    ///# @arg {stirng} event - one of these events `willBlur`, `willFocus`, `didFocus`, `didBlur`
    ///# https://reactnavigation.org/docs/en/navigation-prop.html#addlistener-subscribe-to-updates-to-navigation-lifecycle
    ///# @example
    ///# this.nav.on('willBlur', (e) => {
    ///#   console.log('e:', e)
    ///# })
    ///# @chainable
    on (event, cb) {
      // willBlur, willFocus, didFocus, didBlur
      this.navigation.addListener(event, cb)
      return this
    }

    reset () {
      return this.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [ { name: 'Login' } ],
        }),
      )
    }
  }

  return new Navigation()
})()

