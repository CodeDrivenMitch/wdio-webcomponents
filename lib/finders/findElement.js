'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (selector, multiple) {
    function querySelectorAllDeep(selector) {
        return _querySelectorDeep(selector, true);
    }

    function querySelectorDeep(selector) {
        return _querySelectorDeep(selector);
    }

    function _querySelectorDeep(selector, findMany) {
        var lightElement = document.querySelector(selector);

        if (document.head.createShadowRoot || document.head.attachShadow) {
            // no need to do any special if selector matches something specific in light-dom
            if (!findMany && lightElement) {
                return lightElement;
            }
            // do best to support complex selectors and split the query
            var splitSelector = selector.match(/(([^\s\"']+\s*[,>+~]\s*)+|\'[^']*\'+|\"[^\"]*\"+|[^\s\"']+)+/g);

            var possibleElementsIndex = splitSelector.length - 1;
            var possibleElements = collectAllElementsDeep(splitSelector[possibleElementsIndex]);
            var findElements = findMatchingElement(splitSelector, possibleElementsIndex);
            if (findMany) {
                return possibleElements.filter(findElements);
            } else {
                return possibleElements.find(findElements);
            }
        } else {
            if (!findMany) {
                return lightElement;
            } else {
                return document.querySelectorAll(selector);
            }
        }
    }

    function findMatchingElement(splitSelector, possibleElementsIndex) {
        return function (element) {
            var position = possibleElementsIndex;
            var parent = element;
            var foundElement = false;
            while (parent) {
                var foundMatch = parent.matches(splitSelector[position]);
                if (foundMatch && position === 0) {
                    foundElement = true;
                    break;
                }
                if (foundMatch) {
                    position--;
                }
                parent = findParentOrHost(parent);
            }
            return foundElement;
        };
    }

    function findParentOrHost(element) {
        var parentNode = element.parentNode;
        return parentNode && parentNode.host && parentNode.tagName != 'A' ? parentNode.host : parentNode === document ? null : parentNode;
    }

    /**
     * Finds all elements on the page, inclusive of those within shadow roots.
     * @param {string=} selector Simple selector to filter the elements by. e.g. 'a', 'div.main'
     * @return {!Array<string>} List of anchor hrefs.
     * @author ebidel@ (Eric Bidelman)
     * License Apache-2.0
     */
    function collectAllElementsDeep() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        var allElements = [];

        var findAllElements = function findAllElements(nodes) {
            for (var i = 0, el; el = nodes[i]; ++i) {
                allElements.push(el);
                // If the element has a shadow root, dig deeper.
                if (el.shadowRoot) {
                    findAllElements(el.shadowRoot.querySelectorAll('*'));
                }
            }
        };

        findAllElements(document.querySelectorAll('*'));

        return selector ? allElements.filter(function (el) {
            return el.matches(selector);
        }) : allElements;
    }

    if (!multiple) {
        if (!selector) {
            return baseElement || document.documentElement;
        } else {
            return querySelectorDeep(selector);
        }
    } else {
        return querySelectorAllDeep(selector);
    }
};