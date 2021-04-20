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

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('electron-forge:init:git');

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee3(dir) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _oraHandler2.default)('Initializing Git Repository', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee2() {
              return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return new _promise2.default(function () {
                        var _ref3 = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(resolve, reject) {
                          return _regenerator2.default.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return _fsPromise2.default.exists(_path2.default.resolve(dir, '.git'));

                                case 2:
                                  if (!_context.sent) {
                                    _context.next = 5;
                                    break;
                                  }

                                  d('.git directory already exists, skipping git initialization');
                                  return _context.abrupt('return', resolve());

                                case 5:
                                  d('executing "git init" in directory:', dir);
                                  (0, _child_process.exec)('git init', {
                                    cwd: dir
                                  }, function (err) {
                                    if (err) return reject(err);
                                    resolve();
                                  });

                                case 7:
                                case 'end':
                                  return _context.stop();
                              }
                            }
                          }, _callee, undefined);
                        }));

                        return function (_x2, _x3) {
                          return _ref3.apply(this, arguments);
                        };
                      }());

                    case 2:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, undefined);
            })));

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();