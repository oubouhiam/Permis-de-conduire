'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _bluebird = require('bluebird');

var _child_process = require('child_process');

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt('return', new _promise2.default(function (resolve) {
            (0, _child_process.exec)('git --version', function (err) {
              if (err) return resolve(false);
              resolve(true);
            });
          }).then(function (prev) {
            return _promise2.default.resolve(prev && _semver2.default.gt(process.versions.node, '6.0.0'));
          }));

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));