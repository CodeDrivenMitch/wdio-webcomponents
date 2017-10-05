export default function(selector, multiple) {
    var selectors = selector;
    if (document.body.createShadowRoot || document.body.attachShadow) {
        selectors = selectors.split(' ');
    }
    
    function findElement(selectors) {
        var currentElement = document;
        for (var i = 0; i < selectors.length; i++) {
            if (i > 0 && currentElement.shadowRoot) {
                currentElement = currentElement.shadowRoot;
            }

            if(i === selectors.length - 1) {
                if(multiple) {
                    currentElement = currentElement.querySelectorAll(selectors[selectors.length - 1]);
                } else {
                    currentElement = currentElement.querySelector(selectors[selectors.length - 1]);
                }
                break;
            } else {
                currentElement = currentElement.querySelector(selectors[i]);
            }
            
            if (!currentElement) {
                break;
            }
        }


        return currentElement
    }

    return findElement(selectors);
}