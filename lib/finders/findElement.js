'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (selector, multiple) {
    var selectors = selector;
    if (document.body.createShadowRoot || document.body.attachShadow) {
        selectors = selectors.split(' ');
    }

    function findElement(selectors) {
        var currentElement = document;
        for (var i = 0; i < selectors.length; i++) {
            // If the element is a shadow host, go into the shadowRoot
            if (i > 0 && currentElement.shadowRoot) {
                currentElement = currentElement.shadowRoot;
            }

            if (i === selectors.length - 1) {
                // Final selector part. If multiple=true, try to find multiple elements
                if (multiple) {
                    currentElement = currentElement.querySelectorAll(selectors[selectors.length - 1]);
                } else {
                    currentElement = currentElement.querySelector(selectors[selectors.length - 1]);
                }
                break;
            } else {
                currentElement = currentElement.querySelector(selectors[i]);
            }

            if (!currentElement) {
                break;
            }
        }

        return currentElement;
    }

    return findElement(selectors);
};