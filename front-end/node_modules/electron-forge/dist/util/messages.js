"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function info(interactive, message) {
  if (interactive) {
    console.info(message);
  }
}

function warn(interactive, message) {
  if (interactive) {
    console.warn(message);
  }
}

exports.info = info;
exports.warn = warn;