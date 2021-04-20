'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sudo = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _child_process = require('child_process');

var _electronSudo = require('electron-sudo');

var _electronSudo2 = _interopRequireDefault(_electronSudo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var which = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(type, prog, promise) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!((0, _child_process.spawnSync)('which', [prog]).status === 0)) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return promise;

          case 3:
            _context.next = 6;
            break;

          case 5:
            throw new Error(prog + ' is required to install ' + type + ' packages');

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function which(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var sudo = exports.sudo = function sudo(type, prog, args) {
  return new _promise2.default(function (resolve, reject) {
    var sudoer = new _electronSudo2.default({ name: 'Electron Forge' });

    which(type, prog, sudoer.spawn(prog + ' ' + args).then(function (child) {
      child.on('exit', function () {
        var _ref2 = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee2(code) {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(code !== 0)) {
                    _context2.next = 4;
                    break;
                  }

                  console.error(child.output.stdout.toString('utf8').red);
                  console.error(child.output.stderr.toString('utf8').red);
                  return _context2.abrupt('return', reject(new Error(prog + ' failed with status code ' + code)));

                case 4:
                  resolve();

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function (_x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }));
  });
};

exports.default = which;