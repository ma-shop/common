/// @name MockStorage
/// @author Tyler Benton
/// @description
/// This class is used to create a mock of async storage
/// @example
/// describe('Your Test', () => {
///   beforeEach(() => {
///      ('AsyncStorage', new MockStorage())
///   })
///
///   test(....)
/// })
export class MockStorage {
  constructor (cache = {}) {
    this.storage = { ...cache }
  }

  setItem = jest.fn((item, value) => {
    return new Promise((resolve) => {
      this.storage[item] = value
      resolve(value)
    })
  })

  getItem = jest.fn((item) => Promise.resolve(this.storage[item]))

  removeItem = jest.fn((item) => Promise.resolve(delete this.storage[item]))

  multiGet = jest.fn((items) => Promise.resolve(items.map(this.getItem)))

  multiSet = jest.fn((items) => {
    return Promise.resolve(items.map(([ item, value ]) => this.setItem(item, value)))
  })

  multiRemove = jest.fn((items) => Promise.resolve(items.map(this.removeItem)))

  getAllKeys = jest.fn(() => Promise.resolve(Object.keys(this.storage)))
}
