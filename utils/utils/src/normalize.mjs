/// @name normalize
/// @author Tyler Benton
/// @description
/// Removes trailing/leading blank lines. Removes extra whitespace before all the lines that
/// are passed without affecting the formatting of the passes string. Then removes
/// all whitespace at the end of each line.
/// @arg {string, array} content - The content you want to be normalized
/// @returns {string} - The normalized string
/// @example
/// let content = `
///
///     Lorem ipsum dolor sit amet,
///     consectetur adipisicing elit.
///
/// ` aka "\n\n    Lorem ipsum dolor sit amet,\n     consectetur adipisicing elit.\n\n"
///
/// normalize(content) // "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit."
export function normalize (str) {
  // this allows arrays and strings to be passed
  const content = typeof str === 'string' ? str.split('\n') : str
  // remove blank lines from the start
  while (content.length && !content[0].trim().length) content.shift()
  // remove blank lines from the end
  while (content.length && !content[content.length - 1].trim().length) content.pop()
  // get the indent of the string
  const indentNumber = content
    .join('\n')
    // gets the extra whitespace at the beginning of the line and returns a map of the spaces
    .match(/^\s*/gm)
    // sorts the spaces array from smallest to largest and then checks
    // returns the length of the first item in the array
    .sort((a, b) => a.length - b.length)[0].length

  return content
    // remove extra whitespace from the beginning of each line
    .map((line) => line.slice(indentNumber))
    .join('\n') // converts content to string
    .replace(/[^\S\r\n]+$/gm, '') // removes all trailing white spaces from each line
}