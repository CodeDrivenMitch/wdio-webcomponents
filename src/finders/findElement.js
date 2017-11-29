/**
 * This function is sent to the browser by selenium to find the element(s)
 * @param selector The selector to find the element
 * @param multiple Whether we need to find multiple elements
 * @returns {*}
 */

export default function (selector, multiple) {
    var selectors = selector.replace(/:skip-visible/i, '');
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

            var iterSelector = selectors[i].split('::').join(' ');

            if (i === selectors.length - 1 && multiple) {
                // Final selector part and multiple=true, try to find multiple elements
                currentElement = currentElement.querySelectorAll(iterSelector);
            } else {
                currentElement = currentElement.querySelector(iterSelector);
            }

            if (!currentElement) {
                break;
            }
        }


        return currentElement
    }

    return findElement(selectors);
}