import { is } from '@ma-shop/is'

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
is.network = {
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
}
