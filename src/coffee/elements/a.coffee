OJ = require '../oj'
require '../core/object'
require '../dom/nodeFactory'

# # a
nodeName = 'a'

node = (options, owner = OJ.body, calledFromFactory = false) ->

  defaults =
    props:
      id: ''
      class: ''
      text: ''
      href: 'javaScript:void(0);'
      type: ''
      title: ''
      rel: ''
      media: ''
      target: ''
    styles: {}
    events:
      click: OJ.noop


  OJ.extend defaults, options, true

  toggleState = 'off'

  toggle = ->
    if toggleState is 'on'
      toggleState = 'off'
    else toggleState = 'on'  if toggleState is 'off'
    return

  # Click binding
  if defaults.events.click isnt OJ.noop
    click = defaults.events.click
    newClick = (event...) ->
      toggle()
      retVal = click event...
      if defaults.href is '#' then retVal = false
      retVal
    defaults.events.click = newClick
  else
    defaults.events.click = toggle

  ret = OJ.element nodeName, defaults.props, defaults.styles, defaults.events, defaults.text


  if false is calledFromFactory then OJ.nodes.factory ret, owner

  ret

OJ.nodes.register nodeName, node
module.exports = node


