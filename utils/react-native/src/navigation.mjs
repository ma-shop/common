export const nav = (() => {
  class Navigation {
    resetRoute = null

    set (obj) {
      this.navigation = obj
    }

    ///# @name to
    ///# @description navigate to a page
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

    ///# @name setParams
    ///# @description sets the params on the current view
    ///# https://reactnavigation.org/docs/en/navigation-prop.html#setparams-make-changes-to-route-params
    ///# @example
    ///# this.nav.setParams({})
    setParams (params) {
      this.navigation.setParams(params)
    }

    ///# @name setOptions
    ///# @description sets the options on the current view
    ///# https://reactnavigation.org/docs/navigation-prop/#setoptions
    ///# @example
    ///# this.nav.setOptions({})
    setOptions (options) {
      this.navigation.setOptions(options)
    }

    ///# @name isFocused
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
    ///# useEffect(() => {
    ///#   const unsubscribe = this.nav.on('willBlur', (e) => {
    ///#     console.log('e:', e)
    ///#   })
    ///#
    ///#   return unsubscribe
    ///# }, [nav.navigation])
    ///# @returns {fn} The unsubscribe function to remove the event listener
    on (event, cb) {
      // willBlur, willFocus, didFocus, didBlur
      return this.navigation.addListener(event, cb)
    }

    ///# @name dispatch
    ///# @describe dispatches navigation actions
    ///# @args {object} ...args - same as navigation dispatch
    dispatch (...args) {
      return this.navigation.dispatch(...args)
    }

    ///# @name reset
    ///# @description resets the navigation
    ///# @arg {string} name - The route you want to reset it to
    ///# @note you can set a default route using `nav.setResetRoute`
    reset (name) {
      return this.navigation.reset({
        index: 0,
        routes: [ { name: name || this.resetRoute } ],
      })
    }

    ///# @name setResetRoute
    ///# @description Sets the default reset route
    ///# @arg {string} name - the route to reset it to
    setResetRoute (name) {
      this.resetRoute = name
    }
  }

  return new Navigation()
})()
