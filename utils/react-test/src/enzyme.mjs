import React from 'react'
import prettier from 'prettier'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.mount = Enzyme.mount
export const shallow = (element) => {
  // this is a workaround for a react fragment bug, so you don't have
  // to do this yourself:
  // https://github.com/airbnb/enzyme/issues/1149
  if (typeof element.type === 'symbol') {
    // eslint-disable-next-line react/jsx-filename-extension
    return Enzyme.shallow(<div>{element}</div>)
  }
  return Enzyme.shallow(element)
}
global.shallow = shallow

Enzyme.ShallowWrapper.prototype.jsx = function jsx () {
  const placeholder = '{ something: null }'
  const obj = this.debug({ ignoreProps: false, verbose: true }).replace(/{\.\.\.}/g, placeholder)

  return prettier
    .format(obj, {
      parser: 'babylon',
      filepath: 'test/setup.mjs',
      trailingComma: 'all',
      semi: false,
      arrowParens: 'always',
    })
    .replace(new RegExp(placeholder, 'g'), '{...}')
    .replace(';<', '<')
}
// the html function just throws errors so it's just reset to be the jsx function
Enzyme.ShallowWrapper.prototype.html = Enzyme.ShallowWrapper.prototype.jsx

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
