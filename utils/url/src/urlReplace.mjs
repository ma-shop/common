/// @name urlReplace
/// @author Cameron Bates
/// @description
/// Uses an object of key/values to replace templated values out of
/// a url string
/// @param {string} url - string with templates to be replaced
/// @param {object} values - object of key/value pairs
export function urlReplace (url = '', values = {}) {
  const keysArray = Object.keys(values)
  const regex = new RegExp(`{{(${keysArray.join('|')})}}`, 'g')

  const urlPlaceholders = url.match(/{{.*?}}/g)
  if (urlPlaceholders.length !== keysArray.length) {
    throw new Error(`Length mismatch, keys potentially incorrect.\n
    Url Placeholders(${urlPlaceholders.length}): ${urlPlaceholders.join()}\n
    Values(${keysArray.length}): ${keysArray.join()}`)
  }

  return url.replace(regex, (_, key) => values[key])
}
