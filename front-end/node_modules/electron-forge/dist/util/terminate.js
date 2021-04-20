'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on('unhandledRejection', function (err) {
  if (err && err.message && err.stack) {
    console.error('\nAn unhandled rejection has occurred inside Forge:'.red);
    console.error(_colors2.default.red(err.message));
    console.error(_colors2.default.red(err.stack));
  } else {
    console.error('\nElectron forge was terminated:'.red);
    console.error(_colors2.default.red(typeof err === 'string' ? err : (0, _stringify2.default)(err)));
  }
  process.exit(1);
});

process.on('uncaughtException', function (err) {
  if (err && err.message && err.stack) {
    console.error('\nAn unhandled exception has occurred inside Forge:'.red);
    console.error(_colors2.default.red(err.message));
    console.error(_colors2.default.red(err.stack));
  } else {
    console.error('\nElectron forge was terminated:'.red);
    console.error(_colors2.default.red(typeof err === 'string' ? err : (0, _stringify2.default)(err)));
  }
  process.exit(1);
});