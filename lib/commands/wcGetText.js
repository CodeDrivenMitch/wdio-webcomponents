'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @alias browser.wcGetText
 * @param {string=} selector
 */

// Note: function name must be async to signalize WebdriverIO that this function returns a promise
exports.default = function async(selector) {
  return _regenerator2.default.async(function async$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(this.wcElement(selector).value);
          return _context.abrupt('return', this.wcElement(selector).value.innerText);

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
};