'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.init = init;

var _wcElement = require('./commands/wcElement.js');

var _wcElement2 = _interopRequireDefault(_wcElement);

var _wcWaitForExist = require('./commands/wcWaitForExist.js');

var _wcWaitForExist2 = _interopRequireDefault(_wcWaitForExist);

var _wcGetText = require('./commands/wcGetText.js');

var _wcGetText2 = _interopRequireDefault(_wcGetText);

var _wcAttribute = require('./commands/wcAttribute.js');

var _wcAttribute2 = _interopRequireDefault(_wcAttribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WDIOWebComponents = function WDIOWebComponents(browser, options) {
    (0, _classCallCheck3.default)(this, WDIOWebComponents);

    if (!browser) {
        throw new Error('A WebdriverIO instance is needed to initialise wdio-screenshot');
    }

    // add commands to WebdriverIO instance
    browser.addCommand('wcElement', _wcElement2.default.bind(browser));
    browser.addCommand('wcWaitForExist', _wcWaitForExist2.default.bind(browser));
    browser.addCommand('wcGetText', _wcGetText2.default.bind(browser));
    browser.addCommand('wcAttribute', _wcAttribute2.default.bind(browser));
};

// export init function for initialization


function init(webdriverInstance, options) {
    return new WDIOWebComponents(webdriverInstance, options);
}

// export also helpers for regression lib