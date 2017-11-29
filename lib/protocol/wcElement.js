"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _findElement = require("../finders/findElement");

var _findElement2 = _interopRequireDefault(_findElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Override of the browser.element command. Sends the findElement function to the browser.
 *
 * @alias browser.element
 * @param {string=} selector
 */
exports.default = function async(selector) {
  return _regenerator2.default.async(function async$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", this.execute(_findElement2.default, selector.replace(/\:skip-visible/i, ''), false));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};