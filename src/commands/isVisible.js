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

    :isVisible.js
    it('should detect if an element is visible', function () {
        var isVisible = browser.isVisible('#notDisplayed');
        console.log(isVisible); // outputs: false

        isVisible = browser.isVisible('#notVisible');
        console.log(isVisible); // outputs: false

        isVisible = browser.isVisible('#notExisting');
        console.log(isVisible); // outputs: false

        isVisible = browser.isVisible('#notInViewport');
        console.log(isVisible); // outputs: true

        isVisible = browser.isVisible('#zeroOpacity');
        console.log(isVisible); // outputs: true
    });
 * </example>
 *
 * @alias browser.isVisible
 * @param   {String}             selector  DOM-element
 * @return {Boolean|Boolean[]}            true if element(s)* [is|are] visible
 * @uses protocol/elements, protocol/elementIdDisplayed
 * @type state
 *
 */

 export default async function async(selector) {
    let selectorParts = selector.split(' ');
    let elementCommands = [];

    for(let i = selectorParts.length - 1; i > -1 ; i--) {
        let str = "";
        for(let j = 0; j <= i; j++) {
            let selector = selectorParts[j];
            str += `${selectorParts[j]} `;
        }
        if(str.trim().endsWith(':skip-visible')) {
            continue;
        }
        var element = await this.element(str.trim().replace(/\:skip-visible/i, ''));
        if(!element || !(await this.elementIdDisplayed(element.value.ELEMENT)).value) {
            return false;
        }
    }

    return true;
 }