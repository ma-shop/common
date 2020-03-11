import { is } from '../src/is'


describe('is', () => {
  test('env', () => {
    expect(is.env('test')).toBeTruthy()

    expect(is.env('storybook')).toBeFalsy()
  })

  test('type', () => {
    expect(is.type({}, 'object')).toBeTruthy()
    expect(is.type(is.type, 'function')).toBeTruthy()
    expect(is.type(10, [ 'object', 'function', 'number' ])).toBeTruthy()

    expect(is.type(is.type, 'object')).toBeFalsy()
    expect(is.type(10, [ 'object', 'function' ])).toBeFalsy()
    // all other type tests are covered by the tests below
  })

  test('falsy', () => {
    expect(is.falsy(0)).toBeTruthy()
    expect(is.falsy(null)).toBeTruthy()
    expect(is.falsy(undefined)).toBeTruthy()
    expect(is.falsy(false)).toBeTruthy()
    expect(is.falsy('')).toBeTruthy()

    expect(is.falsy(is.falsy)).toBeFalsy()
    expect(is.falsy({})).toBeFalsy()
    expect(is.falsy([])).toBeFalsy()
    expect(is.falsy(10)).toBeFalsy()
  })

  test('truthy', () => {
    expect(is.truthy(0)).toBeFalsy()
    expect(is.truthy(null)).toBeFalsy()
    expect(is.truthy(undefined)).toBeFalsy()
    expect(is.truthy(false)).toBeFalsy()
    expect(is.truthy('')).toBeFalsy()

    expect(is.truthy(is.truthy)).toBeTruthy()
    expect(is.truthy({})).toBeTruthy()
    expect(is.truthy([])).toBeTruthy()
    expect(is.truthy(10)).toBeTruthy()
  })

  test('null', () => {
    expect(is.null(null)).toBeTruthy()
    expect(is.null(undefined)).toBeTruthy()

    expect(is.null(false)).toBeFalsy()
  })

  test('empty', () => {
    expect(is.empty(0)).toBeTruthy()
    expect(is.empty(null)).toBeTruthy()
    expect(is.empty(undefined)).toBeTruthy()
    expect(is.empty(false)).toBeTruthy()
    expect(is.empty('')).toBeTruthy()
    expect(is.empty([])).toBeTruthy()
    expect(is.empty([ '', 0, null ])).toBeTruthy()
    expect(is.empty({})).toBeTruthy()
    expect(is.empty({})).toBeTruthy()

    expect(is.empty([ 'one' ])).toBeFalsy()
    expect(is.empty({ one: '' })).toBeFalsy()
  })

  test('between', () => {
    const month = (str) => new Date(`${str}/01/2019`)
    const array = [ 1, 2, 3 ]
    const number = 10
    const map = new Map([ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ])
    const string = 'woohooo'

    expect(is.between(month('2'), month('1'), month('3'))).toBeTruthy()
    expect(is.between(array, 1, 10)).toBeTruthy()
    expect(is.between(number)).toBeTruthy()
    expect(is.between(map, 1, 20)).toBeTruthy()
    expect(is.between(string, 1, 20)).toBeTruthy()

    expect(is.between(null)).toBeFalsy()
    expect(is.between(undefined)).toBeFalsy()
    expect(is.between({})).toBeFalsy()
    expect(is.between(false)).toBeFalsy()
    expect(is.between(true)).toBeFalsy()
    expect(is.between(new Set())).toBeFalsy()
    expect(is.between(number, 20)).toBeFalsy()
    expect(is.between(month('4'), month('1'), month('3'))).toBeFalsy()
    expect(is.between(month('4'), month('1'), month('3'))).toBeFalsy()
    expect(is.between(array, 1, 2)).toBeFalsy()
    expect(is.between(map, 1, 2)).toBeFalsy()
    expect(is.between(string, 1, 5)).toBeFalsy()
  })

  test('object', () => {
    expect(is.object({})).toBeTruthy()

    expect(is.object([])).toBeFalsy()
    expect(is.object(new Map())).toBeFalsy()
    expect(is.object(new Set())).toBeFalsy()
    expect(is.object(null)).toBeFalsy()
    expect(is.object(new Date())).toBeFalsy()
    expect(is.object(false)).toBeFalsy()
    expect(is.object(0)).toBeFalsy()
    expect(is.object(100)).toBeFalsy()
    expect(is.object('')).toBeFalsy()
  })

  test('array', () => {
    expect(is.array([])).toBeTruthy()

    expect(is.array({})).toBeFalsy()
    expect(is.array(new Map())).toBeFalsy()
    expect(is.array(new Set())).toBeFalsy()
    expect(is.array(null)).toBeFalsy()
    expect(is.array(new Date())).toBeFalsy()
    expect(is.array(false)).toBeFalsy()
    expect(is.array(0)).toBeFalsy()
    expect(is.array(100)).toBeFalsy()
    expect(is.array('')).toBeFalsy()
  })

  test('number', () => {
    expect(is.number(0)).toBeTruthy()
    expect(is.number(100)).toBeTruthy()

    expect(is.number([])).toBeFalsy()
    expect(is.number({})).toBeFalsy()
    expect(is.number(new Map())).toBeFalsy()
    expect(is.number(new Set())).toBeFalsy()
    expect(is.number(null)).toBeFalsy()
    expect(is.number(new Date())).toBeFalsy()
    expect(is.number(false)).toBeFalsy()
    expect(is.number('')).toBeFalsy()
  })

  test('string', () => {
    expect(is.string('')).toBeTruthy()

    expect(is.string({})).toBeFalsy()
    expect(is.string([])).toBeFalsy()
    expect(is.string(new Map())).toBeFalsy()
    expect(is.string(new Set())).toBeFalsy()
    expect(is.string(null)).toBeFalsy()
    expect(is.string(new Date())).toBeFalsy()
    expect(is.string(false)).toBeFalsy()
    expect(is.string(0)).toBeFalsy()
    expect(is.string(100)).toBeFalsy()
  })

  test('map', () => {
    expect(is.map(new Map())).toBeTruthy()

    expect(is.map('')).toBeFalsy()
    expect(is.map({})).toBeFalsy()
    expect(is.map([])).toBeFalsy()
    expect(is.map(new Set())).toBeFalsy()
    expect(is.map(null)).toBeFalsy()
    expect(is.map(new Date())).toBeFalsy()
    expect(is.map(false)).toBeFalsy()
    expect(is.map(0)).toBeFalsy()
    expect(is.map(100)).toBeFalsy()
  })

  test('set', () => {
    expect(is.set(new Set())).toBeTruthy()

    expect(is.set(new Map())).toBeFalsy()
    expect(is.set('')).toBeFalsy()
    expect(is.set({})).toBeFalsy()
    expect(is.set([])).toBeFalsy()
    expect(is.set(null)).toBeFalsy()
    expect(is.set(new Date())).toBeFalsy()
    expect(is.set(false)).toBeFalsy()
    expect(is.set(0)).toBeFalsy()
    expect(is.set(100)).toBeFalsy()
  })

  test('date', () => {
    expect(is.date(new Date())).toBeTruthy()

    expect(is.date(new Set())).toBeFalsy()
    expect(is.date(new Map())).toBeFalsy()
    expect(is.date('')).toBeFalsy()
    expect(is.date({})).toBeFalsy()
    expect(is.date([])).toBeFalsy()
    expect(is.date(null)).toBeFalsy()
    expect(is.date(false)).toBeFalsy()
    expect(is.date(0)).toBeFalsy()
    expect(is.date(100)).toBeFalsy()
  })

  test('regexp', () => {
    expect(is.regexp(/foo/)).toBeTruthy()
    expect(is.regexp(new RegExp('foo'))).toBeTruthy()

    expect(is.regexp(new Date())).toBeFalsy()
    expect(is.regexp(new Set())).toBeFalsy()
    expect(is.regexp(new Map())).toBeFalsy()
    expect(is.regexp('')).toBeFalsy()
    expect(is.regexp({})).toBeFalsy()
    expect(is.regexp([])).toBeFalsy()
    expect(is.regexp(null)).toBeFalsy()
    expect(is.regexp(false)).toBeFalsy()
    expect(is.regexp(0)).toBeFalsy()
    expect(is.regexp(100)).toBeFalsy()
  })

  test('boolean', () => {
    expect(is.boolean(true)).toBeTruthy()
    expect(is.boolean(false)).toBeTruthy()

    expect(is.boolean(new Date())).toBeFalsy()
    expect(is.boolean(new Set())).toBeFalsy()
    expect(is.boolean(new Map())).toBeFalsy()
    expect(is.boolean('')).toBeFalsy()
    expect(is.boolean({})).toBeFalsy()
    expect(is.boolean([])).toBeFalsy()
    expect(is.boolean(null)).toBeFalsy()
    expect(is.boolean(0)).toBeFalsy()
    expect(is.boolean(100)).toBeFalsy()
  })
})
