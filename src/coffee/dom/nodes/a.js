// Generated by CoffeeScript 1.7.1
(function() {
  var __slice = [].slice;

  (function(OJ) {
    'use strict';
    var nodeName;
    nodeName = 'a';
    OJ.nodes.register(nodeName, function(options, owner, calledFromFactory) {
      var click, defaults, newClick, ret, toggle, toggleState;
      if (owner == null) {
        owner = OJ.body;
      }
      if (calledFromFactory == null) {
        calledFromFactory = false;
      }
      defaults = {
        props: {
          id: '',
          "class": '',
          text: '',
          href: '#',
          type: '',
          title: '',
          rel: '',
          media: '',
          target: ''
        },
        styles: {},
        events: {
          click: _.noop
        }
      };
      OJ.extend(defaults, options, true);
      toggleState = 'off';
      toggle = function() {
        if (toggleState === 'on') {
          toggleState = 'off';
        } else {
          if (toggleState === 'off') {
            toggleState = 'on';
          }
        }
      };
      if (defaults.events.click !== _.noop) {
        click = defaults.events.click;
        newClick = function() {
          var event, retVal;
          event = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          toggle();
          retVal = click.apply(null, event);
          if (defaults.href === '#') {
            retVal = false;
          }
          return retVal;
        };
        defaults.events.click = newClick;
      } else {
        defaults.events.click = toggle;
      }
      ret = OJ.element(nodeName, defaults.props, defaults.styles, defaults.events, defaults.text);
      if (false === calledFromFactory) {
        OJ.nodes.factory(ret, owner);
      }
      return ret;
    });
  })((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);

}).call(this);

//# sourceMappingURL=a.map
