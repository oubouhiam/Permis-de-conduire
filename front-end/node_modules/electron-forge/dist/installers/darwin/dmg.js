'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _child_process = require('child_process');

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hdiutil = require('../../util/hdiutil');

var _moveApp = require('../../util/move-app');

var _moveApp2 = _interopRequireDefault(_moveApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(filePath, installSpinner) {
    var mounts, targetMount, volumePath, appName, appPath, targetApplicationPath;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _hdiutil.getMountedImages)();

          case 2:
            mounts = _context.sent;
            targetMount = mounts.find(function (mount) {
              return mount.imagePath === filePath;
            });

            if (targetMount) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return (0, _hdiutil.mountImage)(filePath);

          case 7:
            targetMount = _context.sent;

          case 8:
            _context.prev = 8;
            volumePath = _path2.default.resolve('/Volumes', targetMount.mountPath);
            _context.next = 12;
            return _fsPromise2.default.readdir(volumePath);

          case 12:
            _context.t0 = function (file) {
              return file.endsWith('.app');
            };

            appName = _context.sent.find(_context.t0);

            if (appName) {
              _context.next = 16;
              break;
            }

            throw 'Failed to find .app file in DMG';

          case 16:
            appPath = _path2.default.resolve(volumePath, appName);
            targetApplicationPath = '/Applications/' + _path2.default.basename(appPath);
            _context.next = 20;
            return (0, _moveApp2.default)(appPath, targetApplicationPath, installSpinner, true);

          case 20:

            (0, _child_process.spawn)('open', ['-R', targetApplicationPath], { detached: true });

          case 21:
            _context.prev = 21;
            _context.next = 24;
            return (0, _hdiutil.unmountImage)(targetMount);

          case 24:
            return _context.finish(21);

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[8,, 21, 25]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();