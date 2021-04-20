'use strict';

require('colors');

var _import2 = require('./import');

var _import3 = _interopRequireDefault(_import2);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _install = require('./install');

var _install2 = _interopRequireDefault(_install);

var _lint = require('./lint');

var _lint2 = _interopRequireDefault(_lint);

var _make = require('./make');

var _make2 = _interopRequireDefault(_make);

var _package2 = require('./package');

var _package3 = _interopRequireDefault(_package2);

var _publish = require('./publish');

var _publish2 = _interopRequireDefault(_publish);

var _start = require('./start');

var _start2 = _interopRequireDefault(_start);

var _forgeConfig = require('../util/forge-config');

var _forgeConfig2 = _interopRequireDefault(_forgeConfig);

var _readPackageJson = require('../util/read-package-json');

var _readPackageJson2 = _interopRequireDefault(_readPackageJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  'import': _import3.default, // eslint-disable-line
  init: _init2.default,
  install: _install2.default,
  lint: _lint2.default,
  make: _make2.default,
  'package': _package3.default, // eslint-disable-line
  publish: _publish2.default,
  start: _start2.default,
  utils: {
    getForgeConfig: _forgeConfig2.default,
    readPackageJSON: _readPackageJson2.default
  }
};