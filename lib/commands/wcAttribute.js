'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
exports.default = function async(selector, attribute) {
  return _regenerator2.default.async(function async$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt('return', this.wcElement(selector).getAttribute(attribute));

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
};