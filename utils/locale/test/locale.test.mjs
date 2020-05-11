import { LocaleManager } from '../src/locale'


describe('locale', () => {
  let l
  beforeEach(() => {
    l = new LocaleManager()
  })

  test('parse', () => {
    const obj = l.parse('en-US')

    expect(obj).toMatchSnapshot()
    expect(l.parse('United States')).toBe(obj)
    expect(l.parse('US')).toBe(obj)
    expect(l.parse('USA')).toBe(obj)
    expect(l.parse('USD')).toBe(obj)
  })

  test('is', () => {
    l.setLocale('en-US')

    expect(l.is('en-US')).toBeTruthy()
    expect(l.is('United States')).toBeTruthy()
    expect(l.is('en')).toBeTruthy()
    expect(l.is('US')).toBeTruthy()
    expect(l.is('US')).toBeTruthy()
    expect(l.is('USA')).toBeTruthy()
    expect(l.is('USD')).toBeTruthy()

    expect(l.is(null)).toBeFalsy()
    expect(l.is(undefined)).toBeFalsy()
    expect(l.is('asia')).toBeFalsy()
    expect(l.is('HK')).toBeFalsy()
    expect(l.is('TW')).toBeFalsy()
    expect(l.is('SG')).toBeFalsy()
  })

  {
    const obj = new LocaleManager()

    describe.each(obj.marketLocales)('%s', (current) => {
      test.each(Object.keys(obj.locales[0]))('%s', (key) => {
        obj.setLocale(current)
        expect(obj[key]).toMatchSnapshot()
      })
    })
  }
})
