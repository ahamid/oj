// Generated by CoffeeScript 1.7.1
(function() {
  (function(OJ) {
    'use strict';
    OJ.nodes.register('label', function(options, owner, calledFromFactory) {
      var defaults, ret;
      if (owner == null) {
        owner = OJ.body;
      }
      if (calledFromFactory == null) {
        calledFromFactory = false;
      }
      defaults = {
        props: {
          forAttr: "",
          form: "",
          text: ""
        },
        styles: {},
        events: {
          click: _.noop
        }
      };
      OJ.extend(defaults, options);
      ret = OJ.element('label', defaults.props, defaults.styles, defaults.events);
      if (owner) {
        owner.append(ret[0]);
      }
      if (false === calledFromFactory) {
        OJ.nodes.factory(ret, owner);
      }
      return ret;
    });
  })((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);

}).call(this);

//# sourceMappingURL=label.map
