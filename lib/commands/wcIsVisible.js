"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * Return true if the selected DOM-element found by given selector is visible. Returns an array if multiple DOM-elements are found for the given selector.
 *
 * <example>
    :index.html
    <div id="notDisplayed" style="display: none"></div>
    <div id="notVisible" style="visibility: hidden"></div>
    <div id="notInViewport" style="position:absolute; left: 9999999"></div>
    <div id="zeroOpacity" style="opacity: 0"></div>

    :wcIsVisible.js
    it('should detect if an element is visible', function () {
        var wcIsVisible = browser.wcIsVisible('#notDisplayed');
        console.log(wcIsVisible); // outputs: false

        wcIsVisible = browser.wcIsVisible('#notVisible');
        console.log(wcIsVisible); // outputs: false

        wcIsVisible = browser.wcIsVisible('#notExisting');
        console.log(wcIsVisible); // outputs: false

        wcIsVisible = browser.wcIsVisible('#notInViewport');
        console.log(wcIsVisible); // outputs: true

        wcIsVisible = browser.wcIsVisible('#zeroOpacity');
        console.log(wcIsVisible); // outputs: true
    });
 * </example>
 *
 * @alias browser.wcIsVisible
 * @param   {String}             selector  DOM-element
 * @return {Boolean|Boolean[]}            true if element(s)* [is|are] visible
 * @uses protocol/elements, protocol/elementIdDisplayed
 * @type state
 *
 */

var wcIsVisible = function wcIsVisible(selector) {
    return this.wcElement(selector).isVisible();
};

exports.default = wcIsVisible;