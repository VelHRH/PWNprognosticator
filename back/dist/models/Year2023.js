"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Year2023Schema = new _mongoose["default"].Schema({
  user: {
    type: String,
    required: true
  },
  results: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
});
var _default = _mongoose["default"].model('Year2023', Year2023Schema);
exports["default"] = _default;