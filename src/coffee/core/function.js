// Generated by CoffeeScript 1.7.1
(function() {
  (function(OJ) {
    var method, tryExec;
    OJ.register("tryExec", tryExec = function(tryFunc) {
      'use strict';
      var exception, ret, that;
      ret = false;
      that = this;
      try {
        if (OJ.is.method(tryFunc)) {
          ret = tryFunc.apply(that, Array.prototype.slice.call(arguments, 1));
        }
      } catch (_error) {
        exception = _error;
        if ((exception.name === "TypeError" || exception.type === "called_non_callable") && exception.type === "non_object_property_load") {
          OJ.console.info("Ignoring exception: ", exception);
        } else {
          OJ.console.error(exception);
        }
      } finally {

      }
      return ret;
    });
    OJ.register("method", method = function(tryFunc) {
      'use strict';
      var that;
      that = this;
      return function() {
        var args;
        args = Array.prototype.slice.call(arguments, 0);
        args.unshift(tryFunc);
        return OJ.tryExec.apply(that, args);
      };
    });
  })((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);

}).call(this);

//# sourceMappingURL=function.js.map