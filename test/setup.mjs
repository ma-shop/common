// @note can't import shallow or ShallowWrapper specifically
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'


jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)


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
