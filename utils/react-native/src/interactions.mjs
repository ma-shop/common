import { InteractionManager } from 'react-native'
import { delay } from '@ma-shop/utils'

/// @name interactions
/// @author Tyler Benton
/// @description This function is used to wait for other interactions to finish
/// before you run a specific interaction. It allows animtations to run smooth
/// because there's not as many animations running at a time
/// @arg {number} max [1000] - The max time you wait for interactions to finish
export function interactions (max = 1000) {
  return Promise.race([
    new Promise(InteractionManager.runAfterInteractions),
    delay(max),
  ])
}
