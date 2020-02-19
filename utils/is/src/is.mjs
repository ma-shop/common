
// @todo add a way to set the config
const config = {}

////
/// @name is
/// @author Tyler Benton
////

export const is = {
  /// @name is.env
  /// @description This function is used to check against the current env
  /// @arg {string, array} ...envs - The environments to test
  /// @returns {boolean} if any of the envs passed in match the current
  /// environment then it will return true
  /// @example
  /// is.env('development')
  env (...envs) {
    const nodeEnv = process.env.NODE_ENV
    for (const env of [].concat(...envs)) {
      // return true if any of them match
      // react doesn't set the nodeEnv to be `live`, it uses `production`
      // so we have to test `live` differently
      if ([ 'storybook', 'test', 'development' ].includes(env) && nodeEnv === env) return true
      if (config.env === env) return true
    }

    return false
  },

  /// @name json
  /// @description This will check to see if the string is json or not
  /// @arg {*} obj - The item to test against
  /// @returns {boolean}
  json (obj) {
    if (!is.string(obj)) return false

    try {
      JSON.parse(obj)
      return true
    } catch (e) {
      return false
    }
  },

  /// @name type
  /// @description This will check against multiple types
  /// @alias is.any
  /// @arg {*} obj - The item to test against
  /// @arg {array, string} - The types to test against
  /// @returns {boolean}
  type (obj, types) {
    const objType = Object.prototype.toString
      .call(obj)
      .slice(8, -1)
      .toLowerCase()
    return [].concat(types).includes(objType)
  },

  /// @name falsy
  /// @descriptions Determines if something is falsy
  /// @arg {*} obj - The item to test against
  /// @returns {boolean}
  falsy (obj) {
    return !obj
  },

  /// @name truthy
  /// @descriptions Determines if something is truthy
  /// @arg {*} obj - The item to test against
  /// @returns {boolean}
  truthy (obj) {
    return !!obj
  },

  /// @name null
  /// @descriptions Determines if something is null or undefined
  /// @arg {*} obj - The item to test against
  /// @returns {boolean}
  null (obj) {
    return obj == null
  },

  /// @name empty
  /// @descriptions Determins if something is null, falsy, or empty
  /// @arg {*} obj - The item to test against
  /// @returns {boolean}
  empty (obj) {
    if (is.falsy(obj)) return true
    if (is.string(obj)) return !obj.trim()
    if (is.array(obj)) return !obj.find((item) => !is.empty(item))
    if (is.object(obj)) return !Object.keys(obj).length
    return false
  },

  /// @name between
  /// @descriptions Determines if something is between two values
  /// @arg {*} obj - The item to test against bounds
  /// @arg {*} from - Lower bound to test against
  /// @arg {*} to - Upper bound to test against
  /// @returns {boolean}
  between (_, from = 0, to = Infinity) {
    let obj = _

    // this is disabled because it's easier to read this way
    // eslint-disable-next-line
    if (!is.type(obj, [ 'array', 'date', 'map', 'number', 'string' ])) return false

    // if an array is passed in check the length
    if (is.string(obj) || is.array(obj)) {
      obj = obj.length
    } else if (is.map(obj)) {
      obj = obj.size
    }

    return obj >= from && obj <= to
  },
}

is.any = is.type

const types = [
  'object',
  'array',
  'number',
  'string',
  'map',
  'set',
  'date',
  'regexp',
  'boolean',
  'function',
]
types.forEach((type) => {
  is[type] = (obj) => is.type(obj, type)
})


export function addCheck (name, obj) {
  is[name] = obj
}
