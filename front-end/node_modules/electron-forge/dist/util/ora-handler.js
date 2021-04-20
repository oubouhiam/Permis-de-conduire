'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _ora = require('./ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MockOra = function () {
  function MockOra() {
    (0, _classCallCheck3.default)(this, MockOra);
  }

  (0, _createClass3.default)(MockOra, [{
    key: 'succeed',
    value: function succeed() {
      return this;
    }
  }, {
    key: 'fail',
    value: function fail() {
      return this;
    }
  }, {
    key: 'start',
    value: function start() {
      return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      return this;
    }
  }]);
  return MockOra;
}();

var asyncOra = function asyncOra(initialOraValue, asyncFn) {
  var processExitFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : process.exit;

  var fnOra = new MockOra();
  if (asyncOra.interactive) {
    fnOra = (0, _ora2.default)(initialOraValue).start();
  }
  return new _promise2.default(function (resolve, reject) {
    asyncFn(fnOra).then(function () {
      fnOra.succeed();
      resolve();
    }).catch(function (err) {
      fnOra.fail();
      if (asyncOra.interactive) {
        if (err && err.message && err.stack) {
          console.error('\nAn unhandled error has occurred inside Forge:'.red);
          console.error(_colors2.default.red(err.message));
          console.error(_colors2.default.red(err.stack));
        } else {
          console.error('\nElectron forge was terminated:'.red);
          console.error(_colors2.default.red(typeof err === 'string' ? err : (0, _stringify2.default)(err)));
        }
        processExitFn(1);
        // If the process is still alive we should continue because either something went really wrong
        // or we are testing this function
        setTimeout(function () {
          return resolve();
        }, 500);
      } else {
        reject(err);
      }
    });
  });
};

asyncOra.interactive = true;

exports.default = asyncOra;