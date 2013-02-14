/*global OJ:true */
(function(_$) {

    /**
     * Node is the class representing an OJ DOM Node.
     * I'm using it less for inheritance chaining an more as a way to explicitly Type my instance data.
     * Returns an Object of type Node: call either by creating Object.create(new Nodee()) or
     * at some later point by someObj.prototype = new Node().
     * Currently,there is no need to publish this class
     */
    var Node = function() {
        'use strict';
        this.nodeInstance = 'Node';
        this.vendorVal = function(OjNode) {
            return   OjNode['?'].apply(this, Array.prototype.slice.call(arguments, 0));
        }
        this.OjVal = null;
        return this;
    };

    /**
     * The node namespace. Represents an OJ Node and its properties.
     * [1]: This class is responsible for constructing the DOM getters (properties on this object which reference Nodes in the DOM tree)
     * [2]: This class exposes helper methods which can get/set properties on this instance of the node.
     * [3]: This class validates the execution of these methods (e.g. Is the node still in the DOM; has it been GC'd behind our backs)
     * [4]: Maintaining an im-memory representation of tree with children/parents
     */
    OJ.makeSubNameSpace('node');

    /**
     * Fetches an elemnt by ID and returns the node cast as an OJ Node

    */
    OJ.node.lift('getById', function(id) {
        var ret = null,
            htmlEl;
        if (id) {
            htmlEl = document.getElementById(id);
            if (htmlEl) {
                ret = OJ.node.wrapper(null, htmlEl);
            }
        }
        return ret;
    });

    OJ.node.lift('wrapper', function(OjNode, DomEl, options) {
        'use strict';
        if (OjNode || OjNode instanceof Node || DomEl) {
            var OjInternal = {
                data: {},
                enabled: true,
                isValid: false
            };

            if (!OjNode || OJ.is.objectNullOrEmpty(OjNode)) {
                OjNode = Object.create(new Node());
            }
            else if (false === (OjNode instanceof Node)) {
                OjNode.prototype = new Node();
            }
            else {
                /***
                 *  Multiple returns are generally considered bad practice,
                 *  but in this case I think it's clear what our intention is:
                 *  if this is already an OJ Node, return it.
                 */
                return OjNode;
            }

            (function _initConstructor() {
                //Validate and setup our Node instance
                if (OjNode && OjNode[0] instanceof HTMLElement && OJ.is.vendorObject(OjNode['?'])) {
                    OjInternal.isValid = true;
                }
                else if (OJ.is.vendorObject(DomEl)) {
                    Object.defineProperty(OjNode, '?', {
                        value: DomEl
                    });
                    Object.defineProperty(OjNode, '0', {
                        value: DomEl[0]
                    });
                    OjInternal.isValid = true;
                }
                else if (DomEl instanceof HTMLElement) {
                    Object.defineProperty(OjNode, '0', {
                        value: DomEl
                    });
                    Object.defineProperty(OjNode, '?', {
                        value: OJ['?']('#' + DomEl.id)
                    });
                    OjInternal.isValid = true;
                }
                else {
                    OjInternal.isValid = false;
                    //No reason to continue. There is no juice to be had here.
                    throw new Error('Cannot make OJ without citrus fruit! OJ.node.wrapper was handed an invalid DOM handle.');
                }
            }()); //end initConstructor

            // No technical need to sequester the code in this way,
            // but it feels more readable in these blocksarent..nodeInstance === 'node'
            (function _postConstructor() {
                //We have a valid OjNode, let's build it out.
                Object.defineProperty(OjNode, 'isValid', {
                    value: OjInternal.isValid
                });

                Object.defineProperty(OjNode, 'tagName', {
                    value: OjNode[0].tagName
                });

                Object.defineProperty(OjNode, 'childNodes', {
                    value: [],
                    writable: true
                });

                var addRoot = function(ojNode) {
                    var ret = null;
                    if (ojNode instanceof Node && false === (ojNode.root instanceof Node)) {
                        if (ojNode && ojNode[0] && ojNode[0].tagName !== 'BODY') {
                            if (!ojNode.root && !ojNode.root[0]) {
                                if (!ojNode.parent && !ojNode.parent[0]) {
                                    //Without valid OJ parents, the only logical root node is the body node
                                    ret = document.getElementsByTagName('body')[0];
                                }
                                else {
                                    var getRoot = function(parent) {
                                        if (parent && parent.nodeInstance === 'node' && parent.parent && parent.parent.nodeInstance === 'node') {

                                            ret = parent.parent;
                                            if (ret.parent && ret.parent.nodeInstance === 'node' && ret.parent[0].tagName.toLowerCase() !== 'body') {
                                                ret = getRoot(ret);
                                            }
                                        }
                                        return ret;
                                    }
                                    ret = getRoot(ojNode);
                                }

                            }
                        }
                        Object.defineProperty(ojNode, 'root', {
                            value: OJ.node.wrapper(null, ret)
                        });
                    }
                    return ret;
                };

                var addParent = function(ojNode) {
                    'use strict';
                    var ret = null;
                    if (ojNode instanceof Node && false === (ojNode.parent instanceof Node)) {
                        if (ojNode && ojNode[0] && ojNode[0].tagName.toLowerCase() !== 'body') {
                            if (!ojNode.parent && !ojNode.parent[0]) {
                                ret = ojNode[0].parentNode;
                            }
                        }
                        Object.defineProperty(ojNode, 'parent', {
                            value: OJ.node.wrapper(null, ret)
                        });
                    }
                    return ret;
                };

                // Keep this method safely enveloped in the closure.
                OjInternal.buildChildNode = function(node, _$element) {
                    'use strict';
                    if (node && false === node instanceof Node) {
                        node.prototype = new Node();
                    }
                    else {
                        node = Object.create(new Node());
                    }
                    // root and parent are safe assumptions

                    Object.defineProperty(node, 'root', {
                        value: addRoot(node)
                    });
                    Object.defineProperty(node, 'parent', {
                        value: addParent(node)
                    });
                    var domEl;
                    if (_$element instanceof HTMLElement) {
                        domEl = _$element;
                    }
                    if (false === OJ.is.vendorObject(_$element)) {
                        _$element = _$(_$element);
                    }
                    if (false === domEl instanceof HTMLElement) {
                        domEl = _$element[0];
                    }

                    Object.defineProperty(node, '?', {
                        value: _$element
                    });
                    Object.defineProperty(node, '0', {
                        value: domEl
                    });

                    OjNode.append(_$element);
                    OjNode.childNodes.push(node);
                    // Extend the child with the wrapper methods around itself
                    return OJ.node.wrapper(node);
                };

                Object.defineProperty(OjInternal, 'chainChildNode', {
                    value: function(_$child, newNode) {
                        'use strict';
                        if (newNode && false === (newNode instanceof Node)) {
                            newNode.prototype = new Node();
                        }
                        else {
                            newNode = new Node();
                        }
                        OjInternal.buildChildNode(newNode, _$child);
                        OjNode.childNodes.push(newNode);
                        return newNode;
                    }
                });

                Object.defineProperty(OjInternal, 'wrapChildNode', {
                    value: function(_$child, newNode) {
                        'use strict';
                        if (newNode && false === (newNode instanceof Node)) {
                            newNode.prototype = new Node();
                        }
                        else {
                            newNode = new Node();
                        }

                        return OjInternal.buildChildNode(newNode, _$child);
                    }
                });

                /**
                 * Whether or no we have removed the node internally.
                 * This doesn't actually test the DOM,
                 * only our in-memory representation of the DOM.
                 */
                Object.defineProperty(OjInternal, 'isNodeAlive', {
                    value: function() {
                        return false === OJ.is.nullOrEmpty(OjNode);
                    }
                });
            }());

            //Define some internal data methods
            Object.defineProperty(OjInternal, 'getDataProp', {
                value: function(propName) {
                    var ret = null;
                    if (OjInternal.isNodeAlive() && false === OJ.is.stringNullOrEmpty(propName)) {

                        if (OjNode[0] && OjNode[0].dataset && OjNode[0].dataset[propName]) {
                            ret = OjNode[0].dataset.propName;
                        }
                        if (OJ.is.stringNullOrEmpty(ret)) {
                            ret = OjInternal.data[propName] || OjNode['?'].data(propName) || OJ.localStorage.getItem(propName + '_control_data_' + OjNode.getId());
                        }
                    }
                    return ret;
                }
            });

            Object.defineProperty(OjInternal, 'setDataProp', {
                value: function(propName, value) {
                    var ret = null;
                    if (OjInternal.isNodeAlive() && false === OJ.is.stringNullOrEmpty(propName)) {
                        ret = value;
                        if (OjNode[0] && OjNode[0].dataset) {
                            OjNode[0].dataset[propName] = value;

                            OjInternal.data[propName] = value;
                        }
                        else {
                            OjInternal.data[propName] = value;
                            OjNode['?'].data(propName, value);
                        }
                    }
                    return ret;
                }
            });

            Object.defineProperty(OjInternal, 'setDataProperties', {
                value: function(obj) {
                    if (obj && Object.keys(obj)) {
                        Object.keys(obj).forEach(function(key, val) {
                            OjInternal.setDataProp(key, val);
                        });
                    }
                }
            });


            /**
              OJ doesn't need many jQuery selectors,
              but when it does they are sequestered on this property to "try" to avoid confusion.
            */
            var el = Object.create(null);

            Object.defineProperty(el, 'children', {
                value: function(searchTerm, selector) {
                    var ret = [];
                    if (OjInternal.isNodeAlive()) {
                        var _$children = OjNode['?'].children(OJ.to.string(searchTerm), OJ.to.string(selector));
                        if (_$children) {
                            _$children.each(function() {
                                var _$child = OJ['?'](this);
                                ret.push(OjInternal.chainChildNode(_$child));
                            });
                        }
                    }
                    return ret;
                }
            });

            Object.defineProperty(el, 'filter', {
                value: function(selector) {
                    var ret = [];
                    if (selector && OjInternal.isNodeAlive()) {
                        var _$children = OjNode['?'].filter(selector);
                        if (_$children.length > 0) {
                            _$children.each(function() {
                                var _$child = _$(this);
                                ret.push(OjInternal.wrapChildNode(_$child));
                            });
                        }
                    }
                    return ret;
                }
            });

            Object.defineProperty(el, 'find', {
                value: function(selector) {
                    var ret = [];
                    if (selector && OjInternal.isNodeAlive()) {
                        var _$children = OjNode['?'].find(selector);
                        if (_$children.length > 0) {
                            _$children.each(function() {
                                var _$child = _$(this);
                                ret.push(OjInternal.wrapChildNode(_$child));
                            });
                        }
                    }
                    return ret;
                }
            });

            Object.defineProperty(el, 'first', {
                value: function() {
                    var ret = OjNode.childNodes[0] || OjNode.el.children[0];
                    return ret;
                }
            });

            Object.defineProperty(el, 'parent', {
                value: function() {
                    var ret = {};
                    if (OjInternal.isNodeAlive()) {
                        var _$parent = OjNode['?'].parent();

                        if (false === OJ.is.nullOrEmpty(_$parent) && _$parent.length > 0) {
                            ret = OJ.dom.nodeWrapper({}, _$parent);
                        }
                    }
                    return ret;
                }
            });

            /**
                OJ implements these wrappers around jQuery methods to provide better chaining on OJ Nodes,
                as well as to make it easy to swap out the DOM framework without having to change the interfaces
            */
            Object.defineProperty(OjNode, 'addClass', {
                value: function(name) {
                    if (name && OjInternal.isNodeAlive()) {
                        OjNode['?'].addClass(name);
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'append', {
                value: function(object) {
                    var ret = OjNode;
                    if (object && OjInternal.isNodeAlive()) {
                        OJ.tryThisThenThat(function _first() {
                            OjNode['?'].append(object);
                            ret = OjInternal.chainChildNode(object);
                        }, function _second() {
                            //Probably attempted to append a string which matched a selector (e.g. 'a')
                            //which will attempt to (and fail to) append all <a> nodes to this one.
                            if (OJ.is.string(object)) {
                                OjNode.text(object);
                            }
                        });
                    }
                    return ret;
                }
            });

            Object.defineProperty(OjNode, 'attr', {
                value: function(name, value) {
                    var ret = null;
                    if (name && OjInternal.isNodeAlive()) {
                        ret = OjNode;

                        if (OJ.is.plainObject(name)) {
                            OjNode['?'].attr(name);
                        }
                        else if (arguments.length === 1) {
                            ret = OjNode['?'].attr(name);
                        }
                        else {
                            OjNode['?'].attr(name, value);
                        }
                    }
                    return ret;
                }
            });

            Object.defineProperty(OjNode, 'attach', {
                value: function(object) {
                    var _$child = null,
                        ret;
                    if (object && OjInternal.isNodeAlive()) {
                        OJ.tryThisThenThat(function _first() {
                            _$child = _$(object);
                            if (false === OJ.is.nullOrEmpty(_$child)) {
                                OjNode.append(_$child);
                                ret = OjInternal.chainChildNode(_$child);
                            }
                        }, function _second() {

                        });
                    }
                    return ret;
                }
            });

            Object.defineProperty(OjNode, 'bind', {
                value: function(eventName, event) {
                    if (eventName && OjInternal.isNodeAlive()) {
                        OjNode['?'].on(eventName, event);
                    }
                    return OjNode;
                }
            });
            Object.defineProperty(OjNode, 'on', {
                value: OJ.bind
            });

            Object.defineProperty(OjNode, 'clickOnEnter', {
                value: function(anOjNode) {
                    if (anOjNode && OjInternal.isNodeAlive()) {
                        OjNode['?'].clickOnEnter(anOjNode['?']);
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'css', {
                value: function(param1, param2) {
                    var ret = OjNode;
                    if (param1 && OjInternal.isNodeAlive()) {
                        if (OJ.is.plainObject(param1)) {
                            OjNode['?'].css(param1);
                        }
                        else if (arguments.length === 1) {
                            ret = OjNode['?'].css(param1);
                        }
                        else {
                            OjNode['?'].css(param1, param2);
                        }
                    }
                    return ret;
                }
            });

            Object.defineProperty(OjNode, 'data', {
                value: function(prop, val) {
                    var ret = '';
                    if (prop && OjInternal.isNodeAlive()) {
                        if (OJ.is.plainObject(prop)) {
                            OjInternal.setDataProperties(prop);
                        }
                        else {
                            switch (arguments.length) {
                            case 1:
                                ret = OjInternal.getDataProp(prop);
                                break;
                            case 2:
                                OjInternal.setDataProp(prop, val);
                                ret = OjNode;
                                break;
                            }
                        }
                    }
                    return ret;

                }
            });

            Object.defineProperty(OjNode, 'disable', {
                value: function() {
                    if (OjInternal.isNodeAlive()) {
                        OjInternal.enabled = false;
                        OjNode.addClass('OjDisabled');
                        OjNode.attr('disabled', 'disabled');
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'empty', {
                value: function() {
                    if (OjInternal.isNodeAlive()) {
                        OjNode['?'].empty();
                        OjNode.childNodes = [];
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'enable', {
                value: function() {
                    if (OjInternal.isNodeAlive()) {
                        OjInternal.enabled = true;
                        OjNode.removeClass('OjDisabled');
                        OjNode.removeAttr('disabled');
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'getId', {
                value: function() {
                    var ret = '';
                    if (OjInternal.isNodeAlive()) {
                        ret = OjNode[0].id;
                    }
                    return ret;
                }
            });

            Object.defineProperty(OjNode, 'hide', {
                value: function() {
                    if (OjInternal.isNodeAlive()) {
                        OjNode.addClass('OjHidden');
                        OjNode['?'].hide();
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'length', {
                value: function() {
                    var ret = 0;
                    if (OjInternal.isNodeAlive()) {
                        ret = OJ.to.number(OjNode['?'].length);
                    }
                    return ret;
                }
            });

            Object.defineProperty(OjNode, 'prop', {
                value: function(name, value) {
                    var ret = null;
                    if (name && OjInternal.isNodeAlive()) {
                        ret = OjNode;

                        if (OJ.is.plainObject(name)) {
                            OjNode['?'].prop(name);
                        }
                        else if (arguments.length === 1) {
                            ret = OjNode['?'].prop(name);
                        }
                        else {
                            OjNode['?'].prop(name, value);
                        }
                    }
                    return ret;
                }
            });

            Object.defineProperty(OjNode, 'remove', {
                value: function() {
                    if (OjNode && OjNode['?']) {
                        OjNode['?'].remove();
                        OjNode.childNodes = [];
                        //This will update the internal reference to the node,
                        //which will allow isNodeAlive() to work as expected;
                        //however, it won't delete outstanding references to the Node.
                        //But that's OK. The GC will clean-up just fine.
                        OjNode = null;
                    }
                    return null;
                }
            });

            Object.defineProperty(OjNode, 'removeClass', {
                value: function(name) {
                    if (name && OjInternal.isNodeAlive()) {
                        OjNode['?'].removeClass(name);
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'removeProp', {
                value: function(name) {
                    if (name && OjInternal.isNodeAlive()) {
                        OjNode['?'].removeProp(name);
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'removeAttr', {
                value: function(name) {
                    if (name && OjInternal.isNodeAlive()) {
                        OjNode['?'].removeAttr(name);
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'show', {
                value: function() {
                    if (OjInternal.isNodeAlive()) {
                        OjNode.removeClass('OjHidden');
                        OjNode['?'].show();
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'text', {
                value: function(text) {
                    if (text && OjInternal.isNodeAlive()) {
                        if (arguments.length === 1 && false === OJ.is.nullOrUndefined(text)) {
                            OjNode['?'].text(text);
                            return OjNode;
                        }
                        else {
                            return OJ.to.string(OjNode['?'].text());
                        }
                    }
                }
            });

            Object.defineProperty(OjNode, 'toggle', {
                value: function() {
                    if (OjInternal.isNodeAlive()) {
                        OjNode['?'].toggle();
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'toggleEnable', {
                value: function() {
                    if (OjInternal.isNodeAlive()) {
                        if (OjInternal.enabled) {
                            OjNode.disable();
                        }
                        else {
                            OjNode.enable();
                        }
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'trigger', {
                value: function(eventName, eventOpts) {
                    if (eventName && OjInternal.isNodeAlive()) {
                        OjNode['?'].trigger(eventName, eventOpts);
                    }
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'unbind', {
                value: function(eventName, event) {
                    if (eventName && OjInternal.isNodeAlive()) {
                        OjNode['?'].off(eventName, event);
                    }
                    return OjNode;
                }
            });
            Object.defineProperty(OjNode, 'off', {
                value: OjNode.unbind
            });

            Object.defineProperty(OjNode, 'valueOf', {
                value: function() {
                    return OjNode;
                }
            });

            Object.defineProperty(OjNode, 'value', {
                get: function() {
                    var ret = null;
                    if(null !== OjNode.OjVal) {
                        ret = OjNode.OjVal;
                    } else {
                        ret = OjNode.vendorVal()
                    }
                    return ret;
                },
                set: function(val) {
                    var ret = val;
                    if(null !== OjNode.OjVal) {
                        OjNode.OjVal = ret;
                    } else {
                        OjNode.vendorVal(ret)
                    }
                    return ret;
                }
            });



            /**
             * These are _THE_ mechanisms for building out the DOM.
             * OJ may later support *pend methods, but for now it's turtles all the way down.
             */
            Object.defineProperty(OjNode, 'addChild', {
                value: function(newNode, html) {
                    var _$el = _$(html);
                    if (newNode && false === (newNode instanceof Node)) {
                        newNode.prototype = new Node();
                    }
                    else {
                        newNode = new Node();
                    }
                    return OjInternal.buildChildNode(newNode, _$el);
                }
            });

            /**
             * These are _THE_ mechanisms for building out the DOM.
             * OJ may later support *pend methods, but for now it's turtles all the way down.
             */
            Object.defineProperty(OjNode, 'makeChild', {
                value: function(html) {
                    if (OJ.is.string(html)) {
                        return OjNode.append(html);
                    }
                }
            });

            //Finally! Return something.
            return OJ.node.factory(OjNode);
        }
    });


}(OJ['?']));