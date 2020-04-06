import { find as lodashFind, omit } from 'lodash'

import { locales } from './locales'


const find = (values, _, omittedValues = []) => {
  let obj = _
  // if it's a string assume it's by values
  if (typeof obj === 'string') {
    obj = (item) => Object.values(omit(item, ...omittedValues)).includes(_)
  }
  return lodashFind(values, obj)
}

export class LocaleManager {
  static localeItems = locales

  static locales = LocaleManager.localeItems.map(({ locale }) => locale)

  static get marketLocales () {
    return LocaleManager.localeItems
      .filter(({ isMarketCountry }) => isMarketCountry)
      .map(({ locale }) => locale)
  }

  // stores the current local
  current = 'en-US'

  // expose locales to the class
  locales = LocaleManager.locales

  // expose locales to the class
  marketLocales = LocaleManager.marketLocales

  setLocale (locale) {
    if (!this.locales.includes(locale) && locale !== 'cimode') {
      throw new Error(`Unsupported locale: ${locale}`)
    }

    this.current = locale
  }

  ///# @name parse
  ///# @description parse anything associated with a locale.
  ///# @arg {function, object, array, string} - This accepts the same arguments as the lodash
  ///# [find](https://lodash.com/docs/4.17.15#find) function
  ///# @returns {object} - All the information for that locale
  ///# ```js
  ///# {
  ///#   locale: 'en-US',
  ///#   name: 'United States',
  ///#   language: 'en',
  ///#   country: 'US',
  ///#   alpha2: 'US',
  ///#   alpha3: 'USA',
  ///#   currency: 'USD',
  ///#   moment: 'en',
  ///#   isMarketCountry: true,
  ///# }
  ///# ```
  ///# @example all these examples result in the return object example above
  ///# l.parse('US')
  ///# l.parse({ name: 'United States' })
  ///# l.parse({ currency: 'USD' })
  ///# l.parse([ 'name', 'United States' ])
  ///# // this would return the `en-MY` locale
  ///# l.parse(({ locale }) => locale.includes('MY') && locale.length <= 5)
  parse (obj = this.current, omittedValues) {
    return find(LocaleManager.localeItems, obj, omittedValues)
  }

  /// @name is
  /// @description Takes a locale string and values to see if it's one of the passed countries
  /// @arg {string, array} items - This can be a single value or an array
  /// of values that match the country or locale
  /// @returns {boolean}
  is (...args) {
    // ensures the original array is not modified, and ensures any
    // single values are converted to an array
    const items = [].concat(...args)

    // special cases to check for asian/european countries
    if (items.includes('asia')) {
      items.push('HK', 'SG', 'MY', 'TW')
    } else if (items.includes('europe')) {
      items.push('GB')
    }

    return !!items.find((item) => {
      return Object.values(this.parse(this.current, [ 'moment' ])).includes(item)
    })
  }
}


Object.keys(LocaleManager.localeItems[0]).forEach((key) => {
  Object.defineProperty(LocaleManager.prototype, key, {
    get () {
      // always exclude moment unless the key is moment because it doesn't make any sense
      return this.parse(this.current, key === 'moment' ? [] : [ 'moment' ])[key]
    },
  })
})


export const l = new LocaleManager()
