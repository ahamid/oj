﻿((OJ) ->
  nodeName = 'x-address'
  className = 'address'
  
  OJ.components.members[nodeName] = className
  
  OJ.components.register className, (options, owner) ->
    defaults = 
      props:
        class: 'fb-field-wrapper response-field-address'
    
    OJ.extend defaults, options
    ret = OJ.component defaults, owner, nodeName 
    
    wrapper = ret.div props: class: 'subtemplate-wrapper'
    wrapper.div props: class: 'cover'
    
    street = wrapper.div props: class: 'input-line'
      .span  props: class: 'street'
    street.input props: type: 'text'
    street.label().text 'Address'
    
    cityState = wrapper.div props: class: 'input-line'
    city = cityState.span props: class: 'city'
    city.input props: type: 'text'
    city.label().text 'City'

    state = cityState.span props: class: 'state'
    state.input props: type: 'text'
    state.label().text 'State'    

    zipCountry = wrapper.div props: class: 'input-line'
    zip = zipCountry.span props: class: 'zip'
    zip.input props: type: 'text'
    zip.label().text 'Zipcode'
    
    country = zipCountry.span props: class: 'country'
    country.select().addOption 'United States' 
    country.label().text 'Country'

    ret

  return
) ((if typeof global isnt 'undefined' and global then global else ((if typeof window isnt 'undefined' then window else this)))).OJ