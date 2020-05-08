import React from 'react'
import { View } from 'react-native'
import { is } from '@ma-shop/is'

import { shallow } from './enzyme'


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

    // eslint-disable-next-line react/jsx-filename-extension
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
