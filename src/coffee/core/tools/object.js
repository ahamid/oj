// Generated by CoffeeScript 1.7.1
(function() {
  (function(OJ) {

    /*
    Create an instance of Object
    @param properties {Object} [properties={}] properties to define on the Object
    @param inheritsFromPrototype {Prototype} [inheritsFromPrototype=null] The prototype to inherit from
     */
    var object;
    object = function(properties, inheritsFromPrototype) {
      var obj;
      if (!inheritsFromPrototype) {
        inheritsFromPrototype = null;
      }
      if (!properties) {
        properties = {};
      }
      obj = Object.create(inheritsFromPrototype, properties);

      /*
      Add a property to the object and return it
       */
      OJ.property(obj, 'add', (function(name, val, writable, configurable, enumerable) {
        return OJ.property(obj, name, val, writable, configurable, enumerable);
      }), false, false, false);
      return obj;
    };
    OJ.register('object', object);
    OJ.register('isInstanceOf', function(name, obj) {
      return OJ.contains(name, obj) && OJ.bool(obj[name]);
    });
    OJ.register('contains', function(object, index) {
      var ret;
      ret = false;
      if (false === OJ.isNullOrUndefined(object)) {
        if (OJ.isArray(object)) {
          ret = object.indexOf(index) !== -1;
        }
        if (false === ret && object.hasOwnProperty(index)) {
          ret = true;
        }
      }
      return ret;
    });
    OJ.register('compare', function(obj1, obj2) {
      return _.isEqual(obj1(obj2));
    });
    OJ.register('clone', function(data) {
      return _.cloneDeep(data(true));
    });
    OJ.register('serialize', function(data) {
      var ret;
      ret = '';
      OJ.tryExec(function() {
        ret = JSON.stringify(data);
      });
      return ret || '';
    });
    OJ.register('deserialize', function(data) {
      var ret;
      ret = {};
      if (data) {
        OJ.tryExec(function() {
          ret = window.$.parseJSON(data);
        });
        if (OJ.is.nullOrEmpty(ret)) {
          ret = {};
        }
      }
      return ret;
    });
    OJ.register('params', function(data, delimiter) {
      var ret;
      ret = '';
      delimiter = delimiter || '&';
      if (delimiter === '&') {
        OJ.tryExec(function() {
          ret = $.param(data);
        });
      } else {
        OJ.each(data, function(val, key) {
          if (ret.length > 0) {
            ret += delimiter;
          }
          ret += key + '=' + val;
        });
      }
      return OJ.string(ret);
    });
    OJ.register('extend', function(destObj, srcObj, deepCopy) {
      var ret;
      ret = destObj || {};
      if (arguments.length === 3) {
        ret = $.extend(OJ.bool(deepCopy), ret, srcObj);
      } else {
        ret = $.extend(ret, srcObj);
      }
      return ret;
    });
  })((typeof global !== 'undefined' && global ? global : typeof window !== 'undefined' ? window : this).OJ);

}).call(this);

//# sourceMappingURL=object.map
