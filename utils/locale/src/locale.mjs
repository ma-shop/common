// @todo update this to import it from `@ma-shop/is`

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
  static localeItems = [
    {
      locale: 'en-US',
      name: 'United States',
      language: 'en',
      country: 'US',
      alpha2: 'US',
      alpha3: 'USA',
      curreny: 'USD',
      ///# @note https://github.com/moment/moment/issues/3624
      moment: 'en',
      isMarketCountry: true,
    },
    {
      locale: 'en-AU',
      name: 'Australia',
      language: 'en',
      country: 'AU',
      alpha2: 'AU',
      alpha3: 'AUS',
      curreny: 'AUD',
      moment: 'en-au',
      isMarketCountry: true,
    },
    {
      locale: 'en-CA',
      name: 'Canada',
      language: 'en',
      country: 'CA',
      alpha2: 'CA',
      alpha3: 'CAN',
      curreny: 'CAD',
      moment: 'en-ca',
      isMarketCountry: true,
    },
    {
      locale: 'fr-CA',
      language: 'fr',
      name: 'Canada',
      country: 'CA',
      alpha2: 'CA',
      alpha3: 'CAN',
      curreny: 'CAD',
      moment: 'fr-ca',
      isMarketCountry: false,
    },
    {
      locale: 'en-GB',
      name: 'United Kingdom',
      language: 'en',
      country: 'GB',
      alpha2: 'GB',
      alpha3: 'GBR',
      curreny: 'GBP',
      moment: 'en-gb',
      isMarketCountry: true,
    },
    {
      locale: 'zh-HK',
      name: '香港',
      language: 'zh',
      country: 'HK',
      alpha2: 'HK',
      alpha3: 'HKG',
      curreny: 'HKD',
      moment: 'zh-hk',
      isMarketCountry: true,
    },
    {
      locale: 'en-HK',
      name: 'Hong Kong - English',
      language: 'en',
      country: 'HK',
      alpha2: 'HK',
      alpha3: 'HKG',
      curreny: 'HKD',
      // There's no en-hk locale in moment. But en-HK formats their dates
      // like the UK.
      moment: 'en-gb',
      isMarketCountry: true,
    },
    {
      locale: 'zh-Hant-HK',
      name: '香港',
      language: 'zh-Hant',
      country: 'HK',
      alpha2: 'HK',
      alpha3: 'HKG',
      curreny: 'HKD',
      // traditional chinese
      moment: 'zh-tw',
      isMarketCountry: false,
    },
    {
      locale: 'en-MY',
      name: 'Malaysia - English',
      language: 'en',
      country: 'MY',
      alpha2: 'MY',
      alpha3: 'MYS',
      curreny: 'MYR',
      moment: 'en',
      isMarketCountry: true,
    },
    {
      locale: 'ms-MY',
      name: 'Malaysia',
      language: 'ms',
      country: 'MY',
      alpha2: 'MY',
      alpha3: 'MYS',
      curreny: 'MYR',
      moment: 'ms-my',
      isMarketCountry: true,
    },
    {
      locale: 'zh-MY',
      name: '马来西亚',
      language: 'zh',
      country: 'MY',
      alpha2: 'MY',
      alpha3: 'MYS',
      curreny: 'MYR',
      // simplified chinese
      moment: 'zh-cn',
      isMarketCountry: true,
    },
    {
      locale: 'zh-Hans-MY',
      name: '马来西亚',
      language: 'zh-Hans',
      country: 'MY',
      alpha2: 'MY',
      alpha3: 'MYS',
      curreny: 'MYR',
      moment: null,
      isMarketCountry: false,
    },
    {
      locale: 'en-SG',
      name: 'Singapore',
      language: 'en',
      country: 'SG',
      alpha2: 'SG',
      alpha3: 'SPG',
      curreny: 'SGD',
      moment: 'en-SG',
      isMarketCountry: true,
    },
    {
      locale: 'zh-SG',
      name: '新加坡',
      language: 'zh',
      country: 'SG',
      alpha2: 'SG',
      alpha3: 'SPG',
      curreny: 'SGD',
      // simplified chinese
      moment: 'zh-cn',
      isMarketCountry: true,
    },
    {
      locale: 'zh-Hans-SG',
      name: '新加坡',
      language: 'zh-Hans',
      country: 'SG',
      alpha2: 'SG',
      alpha3: 'SPG',
      curreny: 'SGD',
      // simplified chinese
      moment: 'zh-cn',
      isMarketCountry: false,
    },
    {
      locale: 'zh-TW',
      name: '臺灣',
      language: 'zh',
      country: 'TW',
      alpha2: 'TW',
      alpha3: 'TWN',
      curreny: 'TWD',
      moment: 'zh-tw',
      isMarketCountry: true,
    },
    {
      locale: 'zh-Hant-TW',
      name: '臺灣',
      language: 'zh-Hant',
      country: 'TW',
      alpha2: 'TW',
      alpha3: 'TWN',
      curreny: 'TWD',
      moment: null,
      isMarketCountry: false,
    },
  ]

  static locales = LocaleManager.localeItems.map(({ locale }) => locale)

  static marketLocales = LocaleManager.localeItems
    .filter(({ isMarketCountry }) => isMarketCountry)
    .map(({ locale }) => locale)

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
  ///# @returns {object} - All the information for that locale
  ///# ```js
  ///# {
  ///#   locale: 'en-US',
  ///#   name: 'United States',
  ///#   language: 'en',
  ///#   country: 'US',
  ///#   alpha2: 'US',
  ///#   alpha3: 'USA',
  ///#   curreny: 'USD',
  ///#   moment: 'en',
  ///#   isMarketCountry: true,
  ///# }
  ///# ```
  parse (obj = this.locale, omittedValues) {
    return find(LocaleManager.localeItems, obj, omittedValues)
  }

  /// @name is
  /// @description Takes a locale string and values to see if it's one of the passed countries
  /// @arg {string} locale - A locale string (e.g., 'en-GB')
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
    }

    // check against the country code, or for exact locale matches
    // if someone needs to be that specific
    return items.includes(this.country) || items.includes(this.current)
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


export const locale = new LocaleManager()
