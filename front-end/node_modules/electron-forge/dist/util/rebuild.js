'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _electronRebuild = require('electron-rebuild');

var _electronRebuild2 = _interopRequireDefault(_electronRebuild);

var _oraHandler = require('../util/ora-handler');

var _oraHandler2 = _interopRequireDefault(_oraHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee2(buildPath, electronVersion, platform, arch) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _oraHandler2.default)('Preparing native dependencies', function () {
              var _ref2 = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(rebuildSpinner) {
                var rebuilder, lifecycle, found, done, redraw;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        rebuilder = (0, _electronRebuild2.default)(buildPath, electronVersion, arch);
                        lifecycle = rebuilder.lifecycle;
                        found = 0;
                        done = 0;

                        redraw = function redraw() {
                          rebuildSpinner.text = 'Preparing native dependencies: ' + done + ' / ' + found; // eslint-disable-line
                        };

                        lifecycle.on('module-found', function () {
                          found += 1;redraw();
                        });
                        lifecycle.on('module-done', function () {
                          done += 1;redraw();
                        });

                        _context.next = 9;
                        return rebuilder;

                      case 9:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x5) {
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

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();