"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.init = init;

var _wcElement = require("./protocol/wcElement.js");

var _wcElement2 = _interopRequireDefault(_wcElement);

var _wcElements = require("./protocol/wcElements.js");

var _wcElements2 = _interopRequireDefault(_wcElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WDIOWebComponents = function WDIOWebComponents(browser, options) {
    (0, _classCallCheck3.default)(this, WDIOWebComponents);

    if (!browser) {
        throw new Error('A WebdriverIO instance is needed to initialise wdio-screenshot');
    }

    // add commands to WebdriverIO instance
    console.log("[wdio-webcomponents] Overriding native wdio element/elements commands!");
    browser.addCommand('element', _wcElement2.default.bind(browser), true);
    browser.addCommand('elements', _wcElements2.default.bind(browser), true);
};

// export init function for initialization


function init(webdriverInstance, options) {
    return new WDIOWebComponents(webdriverInstance, options);
}

// export also helpers for regression lib