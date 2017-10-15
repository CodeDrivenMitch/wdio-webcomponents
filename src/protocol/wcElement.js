import findElement from "../finders/findElement";

/**
 * Override of the browser.element command. Sends the findElement function to the browser.
 *
 * @alias browser.element
 * @param {string=} selector
 */
export default async function async(selector) {
    return this.execute(findElement, selector, false);
}
