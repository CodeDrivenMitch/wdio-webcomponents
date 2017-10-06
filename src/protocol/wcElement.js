import findElement from '../finders/findElement'

/**
 * @alias browser.wcElement
 * @param {string=} selector
 */
export default async function async(selector) {
  return this.execute(findElement, selector, false);
}
