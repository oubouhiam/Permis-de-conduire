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

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _moveApp = require('../../util/move-app');

var _moveApp2 = _interopRequireDefault(_moveApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(filePath, installSpinner) {
    var appPath, targetApplicationPath;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _promise2.default(function (resolve) {
              var child = (0, _child_process.spawn)('unzip', ['-q', '-o', _path2.default.basename(filePath)], {
                cwd: _path2.default.dirname(filePath)
              });
              child.stdout.on('data', function () {});
              child.stderr.on('data', function () {});
              child.on('exit', function () {
                return resolve();
              });
            });

          case 2:
            _context.next = 4;
            return _fsPromise2.default.readdir(_path2.default.dirname(filePath));

          case 4:
            _context.t0 = function (file) {
              return file.endsWith('.app');
            };

            _context.t1 = function (file) {
              return _path2.default.resolve(_path2.default.dirname(filePath), file);
            };

            _context.t2 = function (fA, fB) {
              return _fsPromise2.default.statSync(fA).ctime.getTime() - _fsPromise2.default.statSync(fB).ctime.getTime();
            };

            appPath = _context.sent.filter(_context.t0).map(_context.t1).sort(_context.t2)[0];
            targetApplicationPath = '/Applications/' + _path2.default.basename(appPath);
            _context.next = 11;
            return (0, _moveApp2.default)(appPath, targetApplicationPath, installSpinner);

          case 11:

            (0, _child_process.spawn)('open', ['-R', targetApplicationPath], { detached: true });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();