'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

var _confirmIfInteractive = require('../util/confirm-if-interactive');

var _confirmIfInteractive2 = _interopRequireDefault(_confirmIfInteractive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('electron-forge:init:directory');

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee2(dir, interactive) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _oraHandler2.default)('Initializing Project Directory', function () {
              var _ref2 = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(initSpinner) {
                var files, confirm;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        d('creating directory:', dir);
                        _context.next = 3;
                        return _fsPromise2.default.mkdirs(dir);

                      case 3:
                        _context.next = 5;
                        return _fsPromise2.default.readdir(dir);

                      case 5:
                        files = _context.sent;

                        if (!(files.length !== 0)) {
                          _context.next = 14;
                          break;
                        }

                        d('found', files.length, 'files in the directory.  warning the user');
                        initSpinner.stop(_logSymbols2.default.warning);
                        _context.next = 11;
                        return (0, _confirmIfInteractive2.default)(interactive, 'WARNING: The specified path: "' + dir + '" is not empty, do you wish to continue?');

                      case 11:
                        confirm = _context.sent;

                        if (confirm) {
                          _context.next = 14;
                          break;
                        }

                        throw 'Cancelled by user';

                      case 14:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();