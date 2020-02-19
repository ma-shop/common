/// @name delay
/// @author Tyler Benton
/// @description This function is used to create an async delay
/// @arg {number} duration - The amount of time to dealy in ms
/// @async
export function delay (duration) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}
