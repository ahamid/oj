// Generated by CoffeeScript 1.7.1
(function() {
  (function(OJ) {
    var className, nodeName;
    nodeName = 'x-price';
    className = 'price';
    OJ.components.members[className] = nodeName;
    OJ.components.register(className, function(options, owner) {
      var cents, defaults, dollars, price, ret;
      defaults = {};
      OJ.extend(defaults, options, true);
      ret = OJ.component(defaults, owner, nodeName);
      price = ret.make('div', {
        props: {
          "class": 'input-line'
        }
      });
      price.make('span', {
        text: {
          '$': {
            props: {
              "class": 'above-line'
            }
          }
        }
      });
      dollars = price.make('span', {
        props: {
          "class": 'dollars'
        }
      });
      dollars.make('input', {
        props: {
          type: 'text'
        }
      });
      dollars.make('label', {
        text: 'Dollars'
      });
      price.make('span', {
        text: '.',
        props: {
          "class": 'above-line'
        }
      });
      cents = price.make('span', {
        props: {
          "class": 'cents'
        }
      });
      cents.make('input', {
        props: {
          type: 'text'
        }
      });
      cents.make('label', {
        text: 'Cents'
      });
      return ret;
    });
  })((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);

}).call(this);

//# sourceMappingURL=price.js.map