'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _resolvePackage = require('resolve-package');

var _resolvePackage2 = _interopRequireDefault(_resolvePackage);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _initStarterFiles = require('./init-starter-files');

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

var _installDependencies = require('../util/install-dependencies');

var _installDependencies2 = _interopRequireDefault(_installDependencies);

var _ora = require('../util/ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('electron-forge:init:custom');

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee4(dir, template, lintStyle) {
    var templateModulePath, templateModule;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            templateModulePath = void 0;
            _context4.next = 3;
            return (0, _oraHandler2.default)('Locating custom template: "' + template + '"', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee() {
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return (0, _resolvePackage2.default)('electron-forge-template-' + template);

                    case 3:
                      templateModulePath = _context.sent;

                      d('using global template');
                      _context.next = 17;
                      break;

                    case 7:
                      _context.prev = 7;
                      _context.t0 = _context['catch'](0);
                      _context.prev = 9;

                      templateModulePath = require.resolve('electron-forge-template-' + template);
                      d('using local template');
                      _context.next = 17;
                      break;

                    case 14:
                      _context.prev = 14;
                      _context.t1 = _context['catch'](9);
                      throw 'Failed to locate custom template: "' + template + '"\n\nTry `npm install -g electron-forge-template-' + template + '`';

                    case 17:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined, [[0, 7], [9, 14]]);
            })));

          case 3:
            templateModule = require(templateModulePath);


            templateModule = templateModule.default || templateModule;

            _context4.next = 7;
            return (0, _oraHandler2.default)('Installing Template Dependencies', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee2() {
              return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      d('installing dependencies');
                      _context2.next = 3;
                      return (0, _installDependencies2.default)(dir, templateModule.dependencies || []);

                    case 3:
                      d('installing devDependencies');
                      _context2.next = 6;
                      return (0, _installDependencies2.default)(dir, templateModule.devDependencies || [], true);

                    case 6:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, undefined);
            })));

          case 7:
            _context4.next = 9;
            return (0, _oraHandler2.default)('Copying Template Files', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee3() {
              var templateDirectory, tmplPath, files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file;

              return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      templateDirectory = templateModule.templateDirectory;

                      if (!templateDirectory) {
                        _context3.next = 35;
                        break;
                      }

                      tmplPath = templateDirectory;

                      if (_path2.default.isAbsolute(templateDirectory)) {
                        _context3.next = 5;
                        break;
                      }

                      throw 'Custom template path needs to be absolute, this is an issue with "electron-forge-template-' + template + '"';

                    case 5:
                      files = _glob2.default.sync(_path2.default.resolve(tmplPath, '**/*'));
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      _context3.prev = 9;
                      _iterator = (0, _getIterator3.default)(files);

                    case 11:
                      if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context3.next = 21;
                        break;
                      }

                      file = _step.value;
                      _context3.next = 15;
                      return _fsPromise2.default.stat(file);

                    case 15:
                      if (!_context3.sent.isFile()) {
                        _context3.next = 18;
                        break;
                      }

                      _context3.next = 18;
                      return (0, _initStarterFiles.copy)(file, _path2.default.resolve(dir, _path2.default.relative(tmplPath, file).replace(/^_/, '.')));

                    case 18:
                      _iteratorNormalCompletion = true;
                      _context3.next = 11;
                      break;

                    case 21:
                      _context3.next = 27;
                      break;

                    case 23:
                      _context3.prev = 23;
                      _context3.t0 = _context3['catch'](9);
                      _didIteratorError = true;
                      _iteratorError = _context3.t0;

                    case 27:
                      _context3.prev = 27;
                      _context3.prev = 28;

                      if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                      }

                    case 30:
                      _context3.prev = 30;

                      if (!_didIteratorError) {
                        _context3.next = 33;
                        break;
                      }

                      throw _iteratorError;

                    case 33:
                      return _context3.finish(30);

                    case 34:
                      return _context3.finish(27);

                    case 35:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee3, undefined, [[9, 23, 27, 35], [28,, 30, 34]]);
            })));

          case 9:
            if (!(typeof templateModule.postCopy === 'function')) {
              _context4.next = 12;
              break;
            }

            _context4.next = 12;
            return _promise2.default.resolve(templateModule.postCopy(dir, _ora2.default, lintStyle));

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();