// Generated by CoffeeScript 1.7.1
(function() {
  (function(OJ) {
    var number;
    number = Object.create(null);
    Object.defineProperty(number, "isNaN", {
      value: (Number && Number.isNaN ? Number.isNaN : isNaN)
    });
    Object.defineProperty(number, "isFinite", {
      value: (Number && Number.isFinite ? Number.isFinite : isFinite)
    });
    Object.defineProperty(number, "MAX_VALUE", {
      value: (Number && Number.MAX_VALUE ? Number.MAX_VALUE : 1.7976931348623157e+308)
    });
    Object.defineProperty(number, "MIN_VALUE", {
      value: (Number && Number.MIN_VALUE ? Number.MIN_VALUE : 5e-324)
    });
    OJ.register("number", number);
  })((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);

}).call(this);

//# sourceMappingURL=number.js.map