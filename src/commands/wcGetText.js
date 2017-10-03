import _ from 'lodash';

/**
 * @alias browser.wcGetText
 * @param {string=} selector
 */

// Note: function name must be async to signalize WebdriverIO that this function returns a promise
export default async function async(selector) {
    console.log(this.wcElement(selector).value);
    return this.wcElement(selector).value.innerText;
}
