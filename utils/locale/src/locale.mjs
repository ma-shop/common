import { find as lodashFind, omit } from 'lodash'


const find = (values, _, omittedValues = []) => {
  let obj = _
  // if it's a string assume it's by values
  if (typeof obj === 'string') {
    obj = (item) => Object.values(omit(item, ...omittedValues)).includes(_)
  }
  return lodashFind(values, obj)
}

export class LocaleManager {
  // stores the current local
  current = 'en-US'

  locales = []

  // expose locales to the class
  // @todo move to shop project
  get marketLocales () {
    return this.locales
      .map((obj) => obj.isMarketCountry && obj.locale)
      .filter(Boolean)
  }

  setLocale (locale) {
    if (!this.locales.find((obj) => obj.locale === locale) && locale !== 'cimode') {
      throw new Error(`Unsupported locale: ${locale}`)
    }

    this.events.forEach((fn) => fn(locale))

    this.current = locale
  }

  setLocales (obj) {
    this.locales = obj

    Object.keys(this.locales[0]).forEach((key) => {
      Object.defineProperty(this, key, {
        get () {
          // always exclude moment unless the key is moment because it doesn't make any sense
          return this.parse(this.current, key === 'moment' ? [] : [ 'moment' ])[key]
        },
      })
    })
  }

  events = []

  onSetLocale (fn) {
    this.events.push(fn)
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
    return find(this.locales, obj, omittedValues)
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


export const l = new LocaleManager()
