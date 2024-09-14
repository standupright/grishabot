"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.OPEN_API_KEY = exports.CONFIRMATION = exports.TOKEN = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.TOKEN = process.env.TOKEN || '';
exports.CONFIRMATION = process.env.CONFIRMATION || '';
exports.OPEN_API_KEY = process.env.OPEN_API_KEY || '';
exports.PORT = process.env.APP_PORT || '';
