import React from 'react'
import { View } from 'react-native'
import { is } from '@ma-shop/is'
import prettier from 'prettier'
import Enzyme from 'enzyme'


// Make Enzyme functions available in all test files without importing
global.mount = Enzyme.mount
const shallow = (element) => {
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

/// @name withShallow
/// @author Tyler Benton
/// @description This is used to make it easier to setup your
/// defaults component for a test file
/// @arg {Component} Component - The base component
/// @returns {fn} - The curried function is used to pass in defaults
/// This function then returns your function to use later
/// @example
/// const something = withShallow(Something, {
///   isVisible: false,
/// })
///
/// test('isVisible', () => {
///   const obj = something({ isVisible: true })
///   ...
/// })
export function withShallow (Component, _) {
  // @todo handle deep changes better (for example userData changes in AccountMenu.test.jsx)
  return (props) => {
    const defaultProps = is.function(_) ? _() : _

    return shallow(<Component {...defaultProps} {...props} />)
  }
}

/// @name contextConsumer
/// @description This fixes the super weird situation that happens randomly
/// basically instead of returning something correctly you will end up with this
/// extremely helpful thing that will ensure that every test will pass no matter what
/// ```jsx
/// <ContextConsumer>
///   <Component />
/// </ContextConsumer>
/// ```
/// since that is not helpful whatsoever you can use this function instead of shallow
export function contextConsumer (_) {
  let obj = _
  if (typeof obj?.root !== 'function') {
    obj = shallow(obj)
  }
  return shallow(obj.props().children())
}

/// @name snapshot
/// @author Tyler Benton
/// @description This is used to reduce the amount of code it takes to render a snapshot
/// If you pass in a component it will render it for you
/// @arg {*} obj - Anything you want to take a snapshot of
/// @example
/// snapshot(<Button title="woohoo" />)
///
/// @example
/// snapshot({ some: 'really', cool: 'object' })
export function snapshot (obj) {
  let result = obj

  if (result) {
    if (result.mock) {
      [ result ] = result.mock.calls
      if (result.length === 1) {
        [ result ] = result
      }
    } else {
      if (result.type?.toString() === React.Fragment.toString()) {
        result = <View testID="required-view-for-fragments">{result}</View>
      }

      const isComponent = (
        result &&
        result.type &&
        result.props &&
        // make sure these keys exist
        /* eslint-disable no-undefined */
        result.key !== undefined &&
        result.ref !== undefined
      )

      if (isComponent) {
        result = shallow(result)
      }

      try {
        if (result.name() === 'ContextConsumer') {
          result = contextConsumer(result)
        }
      } catch (e) {
        // do nothing
      }
    }
  }

  expect(result).toMatchSnapshot()
}
