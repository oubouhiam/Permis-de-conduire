'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('electron-forge:init:starter-files');

var copy = exports.copy = function copy(source, target) {
  return new _promise2.default(function (resolve, reject) {
    d('copying "' + source + '" --> "' + target + '"');
    var rd = void 0;
    var wr = void 0;
    var rejectCleanup = function rejectCleanup(err) {
      rd.destroy();
      wr.end();
      reject(err);
    };
    rd = _fsPromise2.default.createReadStream(source);
    rd.on('error', rejectCleanup);
    wr = _fsPromise2.default.createWriteStream(target);
    wr.on('error', rejectCleanup);
    wr.on('finish', resolve);
    rd.pipe(wr);
  });
};

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee4(dir, lintStyle) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _oraHandler2.default)('Copying Starter Files', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee3() {
              var tmplPath, rootFiles, srcFiles;
              return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      tmplPath = _path2.default.resolve(__dirname, '../../tmpl');


                      d('creating directory:', _path2.default.resolve(dir, 'src'));
                      _context3.next = 4;
                      return _fsPromise2.default.mkdirs(_path2.default.resolve(dir, 'src'));

                    case 4:
                      rootFiles = ['_gitignore', '_compilerc'];

                      if (lintStyle === 'airbnb') rootFiles.push('_eslintrc');
                      srcFiles = ['index.js', 'index.html'];


                      rootFiles.forEach(function () {
                        var _ref3 = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(file) {
                          return _regenerator2.default.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return copy(_path2.default.resolve(tmplPath, file), _path2.default.resolve(dir, file.replace(/^_/, '.')));

                                case 2:
                                case 'end':
                                  return _context.stop();
                              }
                            }
                          }, _callee, undefined);
                        }));

                        return function (_x3) {
                          return _ref3.apply(this, arguments);
                        };
                      }());
                      srcFiles.forEach(function () {
                        var _ref4 = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee2(file) {
                          return _regenerator2.default.wrap(function _callee2$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  _context2.next = 2;
                                  return copy(_path2.default.resolve(tmplPath, file), _path2.default.resolve(dir, 'src', file));

                                case 2:
                                case 'end':
                                  return _context2.stop();
                              }
                            }
                          }, _callee2, undefined);
                        }));

                        return function (_x4) {
                          return _ref4.apply(this, arguments);
                        };
                      }());

                    case 9:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee3, undefined);
            })));

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();