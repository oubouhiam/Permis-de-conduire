'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _yarnOrNpm = require('yarn-or-npm');

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('electron-forge:init:standard-fix');

var run = function run(dir) {
  return new _promise2.default(function (resolve, reject) {
    var child = (0, _yarnOrNpm.spawn)(['run', 'lint', '--', '--fix'], {
      stdio: 'inherit',
      cwd: dir
    });

    child.on('exit', function (code) {
      if (code === 0) resolve();
      if (code !== 0) reject(new Error('Failed to fix JS to standard style (' + code + ')'));
    });
  });
};

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee2(dir) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _oraHandler2.default)('Applying Standard Style to JS', (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee() {
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      d('executing "standard --fix" in:', dir);
                      _context.next = 3;
                      return run(dir);

                    case 3:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            })));

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();