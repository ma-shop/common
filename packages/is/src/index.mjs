
// @todo add a way to set the config
const config = {}

// @todo get this from `@ma-shop/locale`
// index.js must implicitly import is.mjs due to needing to import
// local-notifications.mjs. However, index.js CANNOT implicitly import
// locale because we get the Buffer is not defined red screen hard stop.
// Therefore, getCountry cannot be imported from the locale util and must be redefined here.
export const getCountry = (locale) => locale?.slice(-2).toUpperCase()

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
  /// @descriptions Determins if something is null or undefined
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
    if (is.falsy(obj)) {
      return true
    } else if (is.string(obj)) {
      return !obj.trim()
    } else if (is.array(obj)) {
      return !obj.find((item) => !is.empty(item))
    } else if (is.object(obj)) {
      return !Object.keys(obj).length
    }
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

  /// @name network
  /// @author Alex Andreescu
  /// @description
  /// contains the common networkStatus checks that are done throughout the app
  /// @example
  /// const networkStatus = 3
  /// return is.network.fetching(networkStatus) // returns true
  /// @note
  /// the following documentation for network is summarized from the github link below
  /// https://github.com/apollographql/apollo-client/blob/master/packages/apollo-client/src/core/networkStatus.ts
  // @todo move into an apollo helper
  network: {
    ///# @name loading
    ///# @author Alex Andreescu
    ///# @description
    ///# determines if a query was fired if not fired before
    ///# @arg {int} networkStatus
    ///# @returns {boolean} eg. true | false
    ///# @note this will be the status if a query fires with partial data returned from the cache
    loading (networkStatus = 0) {
      return networkStatus === 1
    },
    ///# @name fetching
    ///# @author Glyn Thomas
    ///# @description
    ///# Takes a networkStatus integer and returns a boolean
    ///# identifiying if that networkStatus is fetching
    ///# @arg {int} networkStatus
    ///# @returns {boolean} eg. true | false
    fetching (networkStatus = 0) {
      return networkStatus === 3
    },
    ///# @name refetching
    ///# @author Alex Andreescu
    ///# @description
    ///# determines if a query is being refetched
    ///# @note includes generic request flags
    ///# @arg {int} networkStatus
    ///# @returns {boolean} eg. true | false
    refetching (networkStatus = 0) {
      return [ 1, 2, 4 ].includes(networkStatus)
    },
    ///# @name finished
    ///# @author Alex Andreescu
    ///# @description
    ///# determines if a query is no longer inflight
    ///# @note agnostic of response status
    ///# @arg {int} networkStatus
    ///# @returns {boolean} eg. true | false
    finished (networkStatus = 0) {
      return networkStatus > 6
    },
    ///# @name success
    ///# @author Alex Andreescu
    ///# @description
    ///# determines if a query was successfully finished
    ///# @arg {int} networkStatus
    ///# @returns {boolean} eg. true | false
    success (networkStatus = 0) {
      return networkStatus === 7
    },
    ///# @name error
    ///# @author Alex Andreescu
    ///# @description
    ///# determines if a query threw an error
    ///# @arg {int} networkStatus
    ///# @returns {boolean} eg. true | false
    error (networkStatus = 0) {
      return networkStatus === 8
    },
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
