((OJ)->
  'use strict'
  OJ.nodes.register 'textarea', (options, owner = OJ.body, calledFromFactory = false) ->
    
    defaults =
      props:
        name: ""
        placeholder: ""
        value: ""
        text: ""
        maxlength: ""
        autofocus: false
        isRequired: false
        rows: 3
        cols: 25
        disabled: false
        readonly: false
        form: ""
        wrap: ""
      styles: {}
      events:
        click: _.noop
    
    OJ.extend defaults, options
    
    value = defaults.props.value
    
    syncValue = ->
      switch defaults.props.type
        when OJ.enums.inputTypes.checkbox
          value = ret.$.is(":checked")
        when OJ.enums.inputTypes.radio
          value = ret.$.find(":checked").val()
        else  
          value = ret.val()
    
    # Click binding
    if defaults.events.click isnt _.noop
      click = defaults.events.click
      newClick = (event...) ->
        retval = click event...
        syncValue()
        retval
      defaults.events.click = newClick
          
    # Change binding
    if defaults.events.change isnt _.noop
      change = defaults.events.change
      newChange = (event...) ->
        retval = change event...
        syncValue()
        retval
      defaults.events.change = newChange
    
    ret = OJ.element 'textarea', defaults.props, defaults.styles, defaults.events
    if owner then owner.append ret[0]
    
    if false is calledFromFactory then OJ.nodes.factory ret, owner

    ret

  return

) ((if typeof global isnt 'undefined' and global then global else ((if typeof window isnt 'undefined' then window else this)))).OJ