'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  if (process.arch === 'arm' && process.config.variables.arm_version === '7') {
    return 'armv7l';
  }

  return process.arch;
};