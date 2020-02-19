import { Children, cloneElement } from 'react'

/// @name mapProps
/// @author Tyler Benton
/// @description This loops over all the child elements, clones them and passes in your props
/// @arg {components, array} children - The children to loop over
/// @arg {object, function} props [{}] - The extra props to pass in
/// if a function is passed in it will be passed the the current
/// child, index, and the current array of children
/// @arg {boolean} deep [false] - If you want it to recursively set props on children
/// @returns {array} modified children
export function mapProps (children, props = {}, deep = false) {
  const obj = Children.toArray(children).filter(Boolean)

  if (!obj.length) return []

  return Children.map(obj, (_, i) => {
    let child = _

    // this is the only way to check if the child is a fragment
    if (
      typeof child.type === 'symbol' ||
      (
        deep &&
        child?.props?.children &&
        typeof child.props.children === 'object'
      )
    ) {
      child = cloneElement(child, {
        ...child.props,
        children: mapProps(child.props.children, props, deep),
      })
    }

    return cloneElement(child, {
      key: child?.key || i,
      ...(typeof props === 'function' ? props(child, i, obj) : props),
    })
  })
}
