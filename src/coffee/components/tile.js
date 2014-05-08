// Generated by CoffeeScript 1.7.1
(function() {
  (function(OJ) {
    var className, nodeName;
    nodeName = 'x-tile';
    className = 'tile';
    OJ.components.members[nodeName] = className;
    OJ.components.register(className, function(options, owner) {
      var defaults, ret;
      defaults = {
        smallSpan: '',
        mediumSpan: '4',
        largeSpan: '',
        props: {
          "class": 'tile'
        }
      };
      OJ.extend(defaults, options, true);
      if (defaults.spallSpan) {
        defaults.props["class"] += ' col-xs-' + defaults.spallSpan;
      }
      if (defaults.mediumSpan) {
        defaults.props["class"] += ' col-md-' + defaults.mediumSpan;
      }
      if (defaults.largeSpan) {
        defaults.props["class"] += ' col-lg-' + defaults.largeSpan;
      }
      ret = OJ.component(defaults, owner, nodeName);
      return ret;
    });
  })((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);

}).call(this);

//# sourceMappingURL=tile.map
