"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require('firebase-functions');
exports.functionConfig = functions.config();
exports.PHONE_NUMBER_PRIVACY_SECRET_KEY = exports.functionConfig.envs.secret_key;
//# sourceMappingURL=config.js.map