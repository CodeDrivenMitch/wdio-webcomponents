import _ from 'lodash';

/**
 * @alias browser.wcElement
 * @param {string=} selector
 */

// Note: function name must be async to signalize WebdriverIO that this function returns a promise
export default async function async(selector) {
    return this.execute(function(selectors) {

        function findElement(selectors) {
          var currentElement = document;
          for (var i = 0; i < selectors.length; i++) {
            if (i > 0 && !!currentElement.shadowRoot) {
              currentElement = currentElement.shadowRoot;
            }
    
            currentElement = currentElement.querySelector(selectors[i]);

            if (!currentElement) {
              break;
            }
          }
    
          return currentElement;
        }
    
        if (document.body.createShadowRoot || document.body.attachShadow) {
          selectors = [selectors.split(' ')];
        }

        console.log(selectors);
    
        return findElement(selectors);
      }, selector);
}
