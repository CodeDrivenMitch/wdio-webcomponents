import wcElement from './commands/wcElement.js';
import wcWaitForExist from './commands/wcWaitForExist.js';
import wcGetText from './commands/wcGetText.js';
import wcAttribute from './commands/wcAttribute.js';

class WDIOWebComponents {
    
    constructor(browser, options) {
        if (!browser) {
            throw new Error('A WebdriverIO instance is needed to initialise wdio-screenshot')
        }

        // add commands to WebdriverIO instance
        browser.addCommand('wcElement', wcElement.bind(browser));
        browser.addCommand('wcWaitForExist', wcWaitForExist.bind(browser));
        browser.addCommand('wcGetText', wcGetText.bind(browser));
        browser.addCommand('wcAttribute', wcAttribute.bind(browser));
    }
}

// export init function for initialization
export function init(webdriverInstance, options) {
    return new WDIOWebComponents(webdriverInstance, options);
}

// export also helpers for regression lib
export {
};
    