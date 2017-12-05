import findElement from "../finders/findElement";

/**
 * Override of the browser.elements command. Sends the findElement function to the browser.
 *
 * @alias browser.elements
 * @param {string=} selector
 */
export default async function async(selector) {
    return this.execute(findElement, selector.replace(/\:skip-visible/i, ''), true);

}
