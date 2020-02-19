import { LocaleManager } from '../src/locale'


describe('locale', () => {
  let locale
  beforeEach(() => {
    locale = new LocaleManager()
  })

  test('parse', () => {
    const obj = locale.parse('en-US')

    expect(obj).toMatchSnapshot()
    expect(locale.parse('United States')).toBe(obj)
    expect(locale.parse('US')).toBe(obj)
    expect(locale.parse('USA')).toBe(obj)
    expect(locale.parse('USD')).toBe(obj)
  })

  describe.each(LocaleManager.marketLocales)('%s', (current) => {
    test.each(Object.keys(LocaleManager.localeItems[0]))('%s', (key) => {
      locale.setLocale(current)
      expect(locale[key]).toMatchSnapshot()
    })
  })
})
