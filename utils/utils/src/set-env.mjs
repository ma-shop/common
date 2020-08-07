/// @name setEnv
/// @author Tyler Benton
/// @description This updates the current env if needed
/// @arg {string} environment - The environment to set
export function setEnv (environment) {
  if (!environment) return

  process.env.NODE_ENV = environment
}
