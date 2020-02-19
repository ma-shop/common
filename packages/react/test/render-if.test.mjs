/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Text } from 'react-native'

import { renderIf } from '../src'


describe('renderIf', () => {
  test.each([
    'woohoo',
    true,
    [ 'woohoo' ],
    { woohoo: 'woohoo' },
  ])('truthy "%s"', (condition) => {
    const element = <Text>woohoo</Text>

    expect(renderIf(condition, element)).toBeTruthy()
    expect(renderIf(condition, () => element)).toBeTruthy()
  })

  test.each([
    '',
    null,
    false,
    [ '', null ],
    {},
  ])('falsy "%s"', (condition) => {
    const element = <Text>{JSON.stringify(condition)}</Text>

    expect(renderIf(condition, element)).toBe(null)
    expect(renderIf(condition, () => element)).toBe(null)
  })

  test('with props', () => {
    function SomeComponent (props) {
      return renderIf(props.if, () => <Text>woohoo</Text>)
    }
    SomeComponent.defaultProps = {
      if: true,
    }

    expect(shallow(<SomeComponent />).isEmptyRender()).toBeFalsy()
    expect(shallow(<SomeComponent if={2 < 10} />).isEmptyRender()).toBeFalsy()
    expect(shallow(<SomeComponent if={false} />).isEmptyRender()).toBeTruthy()
  })

  test('with multiple conditions', () => {
    function SomeComponent ({ children, ...props }) {
      return renderIf(props.if, children, () => <Text>{children}</Text>)
    }
    SomeComponent.defaultProps = {
      if: true,
    }

    expect(shallow(<SomeComponent />).isEmptyRender()).toBeTruthy()

    const obj = shallow(
      <SomeComponent if={2 < 10}>
        <Text>woohoo</Text>
      </SomeComponent>,
    )
    expect(obj.isEmptyRender()).toBeFalsy()
  })
})
