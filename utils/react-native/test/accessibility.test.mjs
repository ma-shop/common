import { PixelRatio } from 'react-native'

import { accessibilityStates, fontScale } from '../src/accessibility'


PixelRatio.getFontScale = jest.fn(() => 1)

describe('accessibility', () => {
  test('accessibilityStates', () => {
    const actual = accessibilityStates({ isDisabled: true, disabled: true, something: false })

    expect(actual).toMatchSnapshot()
  })

  describe('fontScale', () => {
    test('allowFontScaling and noFontScaling', () => {
      expect(fontScale({ allowFontScaling: false })).toBe(1)
      expect(fontScale({ noFontScaling: true })).toBe(1)
    })

    test('minimumFontScale', () => {
      PixelRatio.getFontScale.mockImplementationOnce(() => 0.5)

      expect(fontScale()).toBe(1)

      PixelRatio.getFontScale.mockImplementationOnce(() => 1.5)

      expect(fontScale()).toBe(1.5)
    })

    test('maxFontSizeMultiplier', () => {
      PixelRatio.getFontScale.mockImplementationOnce(() => 4)

      expect(fontScale()).toBe(2.25)

      PixelRatio.getFontScale.mockImplementationOnce(() => 1.5)

      expect(fontScale()).toBe(1.5)
    })
  })
})

