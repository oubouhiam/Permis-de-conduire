'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureFile = exports.ensureDirectory = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

// This is different from fs-extra's ensureDir because it wipes out the existing directory,
// if it's found.
var ensureDirectory = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(dir) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _fsPromise2.default.exists(dir);

          case 2:
            if (!_context.sent) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return _fsPromise2.default.remove(dir);

          case 5:
            return _context.abrupt('return', _fsPromise2.default.mkdirs(dir));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function ensureDirectory(_x) {
    return _ref.apply(this, arguments);
  };
}();

// This is different from fs-extra's ensureFile because it wipes out the existing file,
// if it's found.


var ensureFile = function () {
  var _ref2 = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee2(file) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _fsPromise2.default.exists(file);

          case 2:
            if (!_context2.sent) {
              _context2.next = 5;
              break;
            }

            _context2.next = 5;
            return _fsPromise2.default.remove(file);

          case 5:
            _context2.next = 7;
            return _fsPromise2.default.mkdirs(_path2.default.dirname(file));

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function ensureFile(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ensureDirectory = ensureDirectory;
exports.ensureFile = ensureFile;