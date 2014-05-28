// Generated by CoffeeScript 1.7.1
(function() {
  (function(OJ) {
    module('x-input-group', {
      setup: function() {
        OJ['GENERATE_UNIQUE_IDS'] = true;
        if (!OJ.body.make) {
          return OJ.nodes.div();
        }
      }
    });
    test('Test the inputgroup component', function() {
      var dNode, inputgroup, nodeId;
      expect(4);
      inputgroup = OJ.body.make('inputgroup');
      deepEqual(inputgroup.componentName === 'x-input-group', true, 'Component is an inputgroup');
      nodeId = inputgroup.getId();
      dNode = document.getElementById(nodeId);
      ok(dNode, 'Node is in the DOM');
      deepEqual(nodeId, dNode.id, 'Element IDs are equal');
      inputgroup.remove();
      equal(undefined, document.getElementById(nodeId, 'inputgroup has been removed'));
    });
  })((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);

}).call(this);

//# sourceMappingURL=test.inputgroup.map
