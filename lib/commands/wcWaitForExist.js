'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @alias browser.wcWaitForExist
 * @param {string=} selector
 */

// Note: function name must be async to signalize WebdriverIO that this function returns a promise
exports.default = function async(selector, ms, reverse) {
    var _this = this;

    var isReversed, errorMsg;
    return _regenerator2.default.async(function async$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    reverse = typeof reverse === 'boolean' ? reverse : false;
                    /*!
                    * ensure that ms is set properly
                    */
                    if (typeof ms !== 'number') {
                        ms = this.options.waitforTimeout;
                    }

                    isReversed = reverse ? '' : 'not';
                    errorMsg = 'element ("' + (selector || this.lastResult.selector) + '") still ' + isReversed + ' existing after ' + ms + 'ms';
                    return _context.abrupt('return', this.waitUntil(function () {
                        return !!_this.wcElement(selector).value;
                    }, ms, errorMsg));

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, null, this);
};