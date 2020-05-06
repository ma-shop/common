import { Text, ViewPropTypes } from 'react-native'
import { shapes } from '@ma-shop/react'
import PropTypes from 'prop-types'


shapes.textStyle = PropTypes.oneOfType([
  Text.propTypes.style,
  PropTypes.arrayOf(Text.propTypes.style),
])

shapes.viewStyle = PropTypes.oneOfType([
  ViewPropTypes.style,
  PropTypes.arrayOf(ViewPropTypes.style),
])
