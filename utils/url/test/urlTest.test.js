import { urlReplace } from '../src'


describe('urlReplace', () => {
  test('takes in an object with one value and returns the correct string', () => {
    const originalUrl = 'Site/Search/Suggest/{{query}}'
    const replacedUrl = 'Site/Search/Suggest/isotonix'
    const keys = { query: 'isotonix' }

    expect(urlReplace(originalUrl, keys)).toEqual(replacedUrl)
  })

  // eslint-disable-next-line max-len
  test('takes in an object with multiple keys and returns the correct string even if the keys are out of order', () => {
    const originalUrl = [
      'Store/Listings',
      '/StoreType/{{storeType}}',
      '/StoreCategories/{{storeCategories}}',
      '/Letter/{{letter}}',
      '/Term/{{term}}',
      '/Page/{{page}}',
      '/{{sort}}',
      '/City/{{city}}',
    ].join('')
    const replacedUrl = 'Store/Listings/StoreType/OneCart/StoreCategories/Auto/Letter/C/Term/tires/Page/1/NAME-ASC/City/Canada'
    const keys = {
      sort: 'NAME-ASC',
      page: '1',
      storeCategories: 'Auto',
      term: 'tires',
      storeType: 'OneCart',
      city: 'Canada',
      letter: 'C',
    }

    expect(urlReplace(originalUrl, keys)).toEqual(replacedUrl)
  })

  // eslint-disable-next-line max-len
  test('takes in an object with more than one key but fails because the string only has one value to replace', () => {
    const originalUrl = 'Store/Product/{{prodId}}'
    const keys = {
      prodId: '12345',
      allPerms: true,
    }

    expect(() => urlReplace(originalUrl, keys)).toThrowErrorMatchingSnapshot()
  })

  // eslint-disable-next-line max-len
  test('takes in an object with one key but fails because the string only has two values to replace', () => {
    const originalUrl = 'Store/Product/{{prodId}}/{{allPerms}}'
    const keys = {
      prodId: '12345',
    }

    expect(() => urlReplace(originalUrl, keys)).toThrowErrorMatchingSnapshot()
  })
})
