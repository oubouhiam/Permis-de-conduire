'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('electron-forge:lifecycle');

var useFakeOra = process.env.DEBUG && process.env.DEBUG.includes('electron-forge');

if (useFakeOra) {
  console.warn('WARNING: DEBUG environment variable detected.  Progress indicators will be sent over electron-forge:lifecycle'.red);
}

exports.default = useFakeOra ? function (name) {
  var fake = {
    start: function start() {
      d('Process Started:', name);
      return fake;
    },
    fail: function fail() {
      d(('Process Failed: ' + name).red);
      return fake;
    },
    succeed: function succeed() {
      d('Process Succeeded:', name);
      return fake;
    },
    stop: function stop() {
      d('Process Stopped:', name);
      return fake;
    }
  };
  return fake;
} : _ora2.default;