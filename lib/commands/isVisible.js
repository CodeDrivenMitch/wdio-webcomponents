'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * Return true if the selected DOM-element found by given selector is visible. Returns an array if multiple DOM-elements are found for the given selector.
 *
 * <example>
    :index.html
    <div id="notDisplayed" style="display: none"></div>
    <div id="notVisible" style="visibility: hidden"></div>
    <div id="notInViewport" style="position:absolute; left: 9999999"></div>
    <div id="zeroOpacity" style="opacity: 0"></div>

    :isVisible.js
    it('should detect if an element is visible', function () {
        var isVisible = browser.isVisible('#notDisplayed');
        console.log(isVisible); // outputs: false

        isVisible = browser.isVisible('#notVisible');
        console.log(isVisible); // outputs: false

        isVisible = browser.isVisible('#notExisting');
        console.log(isVisible); // outputs: false

        isVisible = browser.isVisible('#notInViewport');
        console.log(isVisible); // outputs: true

        isVisible = browser.isVisible('#zeroOpacity');
        console.log(isVisible); // outputs: true
    });
 * </example>
 *
 * @alias browser.isVisible
 * @param   {String}             selector  DOM-element
 * @return {Boolean|Boolean[]}            true if element(s)* [is|are] visible
 * @uses protocol/elements, protocol/elementIdDisplayed
 * @type state
 *
 */

exports.default = function async(selector) {
    var selectorParts, elementCommands, i, str, j, _selector, element;

    return _regenerator2.default.async(function async$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    selectorParts = selector.split(' ');
                    elementCommands = [];
                    i = selectorParts.length - 1;

                case 3:
                    if (!(i > -1)) {
                        _context.next = 27;
                        break;
                    }

                    str = "";

                    for (j = 0; j <= i; j++) {
                        _selector = selectorParts[j];

                        str += selectorParts[j] + ' ';
                    }

                    if (!str.trim().endsWith(':skip-visible')) {
                        _context.next = 8;
                        break;
                    }

                    return _context.abrupt('continue', 24);

                case 8:
                    _context.next = 10;
                    return _regenerator2.default.awrap(this.element(str.trim().replace(/\:skip-visible/i, '')));

                case 10:
                    element = _context.sent;
                    _context.t0 = console;
                    _context.t1 = str;
                    _context.next = 15;
                    return _regenerator2.default.awrap(this.elementIdDisplayed(element.value.ELEMENT));

                case 15:
                    _context.t2 = _context.sent.value;

                    _context.t0.log.call(_context.t0, _context.t1, _context.t2);

                    _context.t3 = !element;

                    if (_context.t3) {
                        _context.next = 22;
                        break;
                    }

                    _context.next = 21;
                    return _regenerator2.default.awrap(this.elementIdDisplayed(element.value.ELEMENT));

                case 21:
                    _context.t3 = !_context.sent.value;

                case 22:
                    if (!_context.t3) {
                        _context.next = 24;
                        break;
                    }

                    return _context.abrupt('return', false);

                case 24:
                    i--;
                    _context.next = 3;
                    break;

                case 27:
                    return _context.abrupt('return', true);

                case 28:
                case 'end':
                    return _context.stop();
            }
        }
    }, null, this);
};