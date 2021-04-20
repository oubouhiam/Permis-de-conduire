'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = (0, _debug2.default)('electron-forge:runtime-config');

/*
 * Let's be real: sharing config across spawned processes must be easier than
 * this...
 */

var BasicConfigStore = function () {
  function BasicConfigStore() {
    var _this = this;

    (0, _classCallCheck3.default)(this, BasicConfigStore);

    this._store = {};
    this._dir = _path2.default.resolve(_os2.default.tmpdir(), 'electron-forge');
    this._path = _path2.default.resolve(this._dir, '.runtime.config');
    _fsPromise2.default.mkdirsSync(this._dir);

    process.on('exit', function () {
      _this.reset();
    });
  }

  (0, _createClass3.default)(BasicConfigStore, [{
    key: 'get',
    value: function get(key) {
      this._load();
      d('fetching key', key);
      return this._store[key];
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      this._load();
      this._store[key] = value;
      d('setting key:', key, 'to value:', value);
      _fsPromise2.default.writeFileSync(this._path, (0, _stringify2.default)(this._store));
    }
  }, {
    key: '_load',
    value: function _load() {
      if (_fsPromise2.default.existsSync(this._path)) {
        this._store = JSON.parse(_fsPromise2.default.readFileSync(this._path, 'utf8'));
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._store = {};
      _fsPromise2.default.writeFileSync(this._path, (0, _stringify2.default)(this._store));
    }
  }]);
  return BasicConfigStore;
}();

exports.default = new BasicConfigStore();