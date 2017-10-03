import _ from 'lodash';

/**
 * Finds an element within or outside of shadow root and returns an attribute. We do this
 * by sending JS to the browser traversing the shadow roots.
 * Adapted from: TODO fill url to snippet
 * 
 * Every shadow root on the way to the final element should be in the selector. Without that,
 * the node cannot be found since traversing all the nodes recursively would be a major performance hog.
 * 
 * 
 * @alias browser.wcAttribute
 * @param {string=} selector
 * @param {string=} attribute
 */
export default async function async(selector, attribute) {
    return this.execute(function(selectors, attr) {    

        function getAttribute(selectors, attr) {
          var currentElement = document;
          for (var i = 0; i < selectors.length; i++) {
            // Only go into shadow root if there is one
            if (i > 0 && !!currentElement.shadowRoot) {
              currentElement = currentElement.shadowRoot;
            }
            
                        console.log(currentElement);
    
            currentElement = currentElement.querySelector(selectors[i]);

            if (!currentElement) {
              break;
            }
          }
    
          return currentElement ? currentElement[attr] : null;
        }
    
        if (document.body.createShadowRoot || document.body.attachShadow) {
          selectors = selectors.split(' ');
        }
    
        return getAttribute(selectors, attr);
      }, selector, attribute).then((res) => {
        // Returns the result value on promise completion
        return res.value;
      });
}
