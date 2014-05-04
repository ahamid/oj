((OJ) ->

  ###
   Bind all event handlers
  ###
  bindEvents = (el, events) ->
    if el then _.forOwn events, (val, key) ->
      if val isnt _.noop and _.isFunction val
        callback = (event...) -> val event...
        el.$.bind key, callback
        el.add key, callback
        return

  ###
  Finalize the ThimDOM node
  ###
  finalize = (ret, tag, props, styles, events, text) ->
    ret.add 'tagName', tag
    ret.css styles
    if text then ret.text text
    ret.add '$', $(ret.get())
    ret.add '0', ret.get()
    
    bindEvents ret, events
    ret   
      
  ###
  Create an HTML Element through ThinDom
  ###
  OJ.register 'element', (tag, props, styles, events, text) ->
    ret = ThinDOM tag, props
    finalize ret, tag, props, styles, events, text
    ret
  

  ###
  Restore an HTML Element through ThinDom
  ###
  OJ.register 'restoreElement', (tag, el) ->
    ret = ThinDOM null, null, el
    finalize ret, tag
    ret.add 'isInDOM', true   
    ret               
   
  
  ###
  Persist a handle on the body ode
  ###
  if typeof document isnt 'undefined' then body = document.body else body = null  
  initBody = (el) ->  
    ret = ThinDOM null, id: 'body', el
    ret.isInDOM = true
    finalize ret, 'body'
  
  thinBody = initBody body
  thinBody.getId = ->
    'body'
  
  OJ.register 'body', thinBody 
          
  return
) ((if typeof global isnt 'undefined' and global then global else ((if typeof window isnt 'undefined' then window else this)))).OJ