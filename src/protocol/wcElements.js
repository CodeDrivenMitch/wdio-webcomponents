import _ from 'lodash';
import findElement from '../finders/findElement'

/**
 * @alias browser.wcElement
 * @param {string=} selector
 */

// Note: function name must be async to signalize WebdriverIO that this function returns a promise
export default async function async(selector) {
  return this.execute(findElement, selector, true);

}
