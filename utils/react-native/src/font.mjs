import { round, ui } from '@ma-shop/utils'

/// @name em
/// @description This function is used to mimic the `em` functionality of css
/// em's allow us to code things responsively in a very easy way
/// @arg {number} value - The em value you want to get
/// @returns {unit} - the px value based on the baseUnit size
export function em (value = 1, base) {
  return round(value * (base || ui.fontSize))
}

/// @name px
/// @description this will convert your pixel value to em's
/// @arg {number} value - the pixel to compute
/// @returns {unit} - the em value based on the base unit
export function px (value, base) {
  return round(value / (base || ui.fontSize))
}
