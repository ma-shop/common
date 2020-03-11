/// @name setRef
/// @description This util function is used to help set the ref value
/// on the ref that was passed in. This is required because there are
/// 2 ways to set a ref. When you need access to the ref in a component but
/// you also want to give access to it outside the component this is a helpful function
/// @arg {function, object} refToBe - The ref that's trying to get set
/// @arg {*} ref - The ref to set
export function setRef (_, ref) {
  const refToBe = _
  if (typeof refToBe === 'function') {
    refToBe(ref)
  } else if (refToBe) {
    refToBe.current = ref
  }
}
