// @note can't import shallow or ShallowWrapper specifically
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'


Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.mount = Enzyme.mount
global.shallow = (element) => {
  // this is a workaround for a react fragment bug, so you don't have
  // to do this yourself:
  // https://github.com/airbnb/enzyme/issues/1149
  if (typeof element.type === 'symbol') {
    return Enzyme.shallow(<div>{element}</div>)
  }

  return Enzyme.shallow(element)
}

function wrapFind (proto) {
  const oldFind = proto.find

  proto.find = function find (_) {
    let selector = _
    if (typeof selector === 'string') {
      selector = selector.replace(/#([^\s]+)/g, '[testID="$1"]')
    }

    return oldFind.call(this, selector)
  }
}

wrapFind(Enzyme.ShallowWrapper.prototype)
wrapFind(Enzyme.ReactWrapper.prototype)



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

jest.mock('@react-native-community/async-storage', () => new MockStorage())


jest.mock('react-native-device-info', () => ({
  getDeviceLocale: () => 'en',
  getDeviceCountry: () => 'US',
  getIpAddress: jest.fn().mockResolvedValue('anIpAddress'),
  getUniqueId: jest.fn().mockResolvedValue('deviceInfoUniqueId'),
  getUserAgent: jest.fn().mockResolvedValue('userAgent'),
  getSystemName: jest.fn().mockReturnValue('systemName'),
  getSystemVersion: jest.fn().mockReturnValue('10'),
  getDeviceId: jest.fn().mockReturnValue('12345'),
}))
