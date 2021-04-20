'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _yarnOrNpm = require('yarn-or-npm');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('electron-forge:dependency-installer');

exports.default = function (dir, deps) {
  var areDev = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var exact = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  d('installing', (0, _stringify2.default)(deps), 'in:', dir, 'dev=' + areDev + ',exact=' + exact + ',withYarn=' + (0, _yarnOrNpm.hasYarn)());
  if (deps.length === 0) {
    d('nothing to install, stopping immediately');
    return _promise2.default.resolve();
  }
  var cmd = ['install'].concat(deps);
  if ((0, _yarnOrNpm.hasYarn)()) {
    cmd = ['add'].concat(deps);
    if (areDev) cmd.push('--dev');
    if (exact) cmd.push('--exact');
  } else {
    if (exact) cmd.push('--save-exact');
    if (areDev) cmd.push('--save-dev');
    if (!areDev) cmd.push('--save');
  }
  return new _promise2.default(function (resolve, reject) {
    d('executing', (0, _stringify2.default)(cmd), 'in:', dir);
    var child = (0, _yarnOrNpm.spawn)(cmd, {
      cwd: dir,
      stdio: _config2.default.get('verbose') ? 'inherit' : 'pipe'
    });
    var output = '';
    if (!_config2.default.get('verbose')) {
      child.stdout.on('data', function (data) {
        output += data;
      });
      child.stderr.on('data', function (data) {
        output += data;
      });
    }
    child.on('exit', function (code) {
      if (code !== 0) return reject(new Error('Failed to install modules: ' + (0, _stringify2.default)(deps) + '\n\nWith output: ' + output));
      resolve();
    });
  });
};