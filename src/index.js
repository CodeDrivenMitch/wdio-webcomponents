import wcElement from "./protocol/wcElement.js";
import wcElements from "./protocol/wcElements.js";

class WDIOWebComponents {

    constructor(browser) {
        if (!browser) {
            throw new Error('A WebdriverIO instance is needed to initialise wdio-webcomponents')
        }

        // add commands to WebdriverIO instance
        console.log("[wdio-webcomponents] Overriding native wdio element/elements commands!");
        browser.addCommand('element', wcElement.bind(browser), true);
        browser.addCommand('elements', wcElements.bind(browser), true);
    }
}

// export init function for initialization
export function init(webdriverInstance, options) {
    return new WDIOWebComponents(webdriverInstance, options);
}

// export also helpers for regression lib
export {};
