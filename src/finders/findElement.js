/**
 * This function is sent to the browser by selenium to find the element(s)
 * @param selector The selector to find the element
 * @param multiple Whether we need to find multiple elements
 * @returns {*}
 */

export default function (selector, multiple) {
    function querySelectorAllDeep(selector) {
        return _querySelectorDeep(selector, true);
    }

    function querySelectorDeep(selector) {
        return _querySelectorDeep(selector);
    }

    function _querySelectorDeep(selector, findMany) {
        let lightElement = document.querySelector(selector);

        if (document.head.createShadowRoot || document.head.attachShadow) {
            // no need to do any special if selector matches something specific in light-dom
            if (!findMany && lightElement) {
                return lightElement;
            }
            // do best to support complex selectors and split the query
            const splitSelector = selector.replace(/\s*([,>+~]+)\s*/g, '$1').split(' ');
            const possibleElementsIndex = splitSelector.length - 1;
            const possibleElements = collectAllElementsDeep(splitSelector[possibleElementsIndex]);
            const findElements = findMatchingElement(splitSelector, possibleElementsIndex);
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
        return (element) => {
            let position = possibleElementsIndex;
            let parent = element;
            let foundElement = false;
            while (parent) {
                const foundMatch = parent.matches(splitSelector[position]);
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
        const parentNode = element.parentNode;
        return parentNode && (parentNode.host && parentNode.tagName != 'A') ? parentNode.host : parentNode === document ? null : parentNode;
    }

    /**
     * Finds all elements on the page, inclusive of those within shadow roots.
     * @param {string=} selector Simple selector to filter the elements by. e.g. 'a', 'div.main'
     * @return {!Array<string>} List of anchor hrefs.
     * @author ebidel@ (Eric Bidelman)
     * License Apache-2.0
     */
    function collectAllElementsDeep(selector = null) {
        const allElements = [];

        const findAllElements = function(nodes) {
            for (let i = 0, el; el = nodes[i]; ++i) {
                allElements.push(el);
                // If the element has a shadow root, dig deeper.
                if (el.shadowRoot) {
                    findAllElements(el.shadowRoot.querySelectorAll('*'));
                }
            }
        };

        findAllElements(document.querySelectorAll('*'));

        return selector ? allElements.filter(el => el.matches(selector)) : allElements;
    }

    if (! multiple) {
        if (!selector) {
            return baseElement || document.documentElement;
        } else {
            return querySelectorDeep(selector);
        }
    } else {
        return querySelectorAllDeep(selector);
    }
}
