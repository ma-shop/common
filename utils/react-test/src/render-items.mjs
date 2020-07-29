import React from 'react'

// @name renderItems
// @author Tyler Benton
// @description This is used to render lists with all their items so
// you can easily interact with the items
// @args {EnzymeComponent} list
// @returns {EnzymeComponent}
export function renderItems (list) {
  const { renderItem, items } = list.props()
  return shallow((
    <>
      {items.map((item, index) => shallow(renderItem({ item, index })))}
    </>
  ))
}
