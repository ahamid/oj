// Generated by CoffeeScript 1.7.1
(function() {
  var _bodyscrollIIFE;

  (_bodyscrollIIFE = function(OJ) {

    /*
    Create a new bodyscroll subscriber;
     */
    var subscriber;
    OJ.grids.subscribers.register("bodyscroll", subscriber = function(callBack) {
      "use strict";
      var bodyscroll;
      if (callBack) {

        /*
        Undocumented subscriber method
         */
        return bodyscroll = function() {
          var args;
          args = arguments_;
          return OJ.fun.apply(callBack, args, this);
        };
      }
    });
  })((typeof global !== "undefined" && global ? global : (typeof window !== "undefined" ? window : this)).OJ);

}).call(this);

//# sourceMappingURL=bodyscroll.map