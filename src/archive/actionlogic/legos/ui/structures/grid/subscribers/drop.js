// Generated by CoffeeScript 1.7.1
(function() {
  var _dropIIFE;

  (_dropIIFE = function(OJ) {

    /*
    Create a new drop subscriber;
     */
    var subscriber;
    OJ.grids.subscribers.register("drop", subscriber = function(callBack) {
      "use strict";
      var drop;
      if (callBack) {

        /*
        Returns a callback wrapper with the Ext arguments for drop
        @param node {HTMLElement} the Ext node over which the mouse was positioned
        @param data {Object} the associated data object. Has properties: copy, view, ddel, item, records
        @param overModel {Ext.data.Model} the Model where the event fired
        @param dropPosition {String} 'before' or 'after', depending on mouse position
        @param eOpts {Object} arbitrary Ext object
         */
        return drop = function(node, data, overModel, dropPosition, eOpts) {
          "use strict";
          var args;
          args = arguments_;
          return OJ.fun.apply(callBack, args, this);
        };
      }
    });
  })((typeof global !== "undefined" && global ? global : (typeof window !== "undefined" ? window : this)).OJ);

}).call(this);

//# sourceMappingURL=drop.map