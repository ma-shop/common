import { cloneElement } from 'react'
import i18n from 'i18next'
import sprintf from 'i18next-sprintf-postprocessor'
import { is, l } from '@ma-shop/utils'


export function t (key, values = {}) {
  // this allows us to pass in react elements in as the values
  // <Text>
  //   {t('freeShippingNotMet', { shipFreeDiff: <Text isBold>{shipFreeDiff}</Text> })}
  // </Text>
  // only run this if one of the values passed in is a component
  if (Object.values(values).find((value) => value?.props)) {
    const fakeValues = Object.keys(values).reduce((prev, next) => {
      prev[next] = `[[${next}]]`
      return prev
    }, {})
    const str = i18n.t(key, fakeValues)
    // a `.replace` function can't be used here because it returns a string which
    // won't allow us to pass in components of our own
    return str
      .split(/\[\[|\]\]/g)
      .map((value, i) => {
        if (values[value]) {
          if (is.string(values[value])) {
            return values[value]
          }

          return cloneElement(values[value], { key: i })
        }

        return value
      })
  }

  return i18n.t(key, values)
}

t.i18n = i18n

t.setLocale = (language) => i18n.changeLanguage(language)

t.init = (locales) => {
  // translations object becomes i18next's desired object format, which is:
  // [locale]:
  //  { translation: ((your translation obj) }
  // see https://www.i18next.com/overview/getting-started
  const translations = Object.keys(locales).reduce((previous, current) => {
    // this appeases eslint
    const obj = previous
    obj[current] = { translation: locales[current] }
    return obj
  }, {})

  return i18n
    .use(sprintf)
    .init({
      // https://www.i18next.com/overview/api#changelanguage
      // setting the language to be `cimode` will ensure the `t` function
      // always returns the key which makes testing easier
      lng: process.env.NODE_ENV === 'test' ? 'cimode' : null,
      resources: translations,
      lowerCaseLng: true,
      fallbackLng: __DEV__ ? 'dev' : 'en-us',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
    })
    .then(() => l.onSetLocale(t.setLocale))
}

