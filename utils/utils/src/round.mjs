/// @name round
/// @author Tyler Benton
/// @description This will round a number to the correct decimal point
/// @arg {number} value - The number to round
/// @arg {number} decimalPoints [2] - The decimal point to round the value to
/// @returns {number}
export function round (value, decimalPoints = 2) {
  const points = 10 ** decimalPoints

  return Math.round(value * points) / points
}
