import wcElement from './protocol/wcElement.js';
import wcElements from './protocol/wcElements.js';
import wcWaitForExist from './commands/wcWaitForExist.js';
import wcGetText from './commands/wcGetText.js';
import wcAttribute from './commands/wcAttribute.js';
import wcIsVisible from './commands/wcIsVisible.js';

class WDIOWebComponents {
    
    constructor(browser, options) {
        if (!browser) {
            throw new Error('A WebdriverIO instance is needed to initialise wdio-screenshot')
        }

        // add commands to WebdriverIO instance
        if(options.overwrite === undefined || options.overwrite === true) {
            browser.addCommand('element', wcElement.bind(browser), true);
            browser.addCommand('elements', wcElements.bind(browser), true);
        }
        browser.addCommand('wcElement', wcElement.bind(browser));
        browser.addCommand('wcElements', wcElements.bind(browser));
        browser.addCommand('wcWaitForExist', wcWaitForExist.bind(browser));
        browser.addCommand('wcGetText', wcGetText.bind(browser));
        browser.addCommand('wcAttribute', wcAttribute.bind(browser));
        browser.addCommand('wcIsVisible', wcIsVisible.bind(browser));
    }
}

// export init function for initialization
export function init(webdriverInstance, options) {
    return new WDIOWebComponents(webdriverInstance, options);
}

// export also helpers for regression lib
export {
};
    