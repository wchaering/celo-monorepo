"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
    LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["WARN"] = 4] = "WARN";
    LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
// This is not exported. An instance of it is exported instead.
var LoggerClass = /** @class */ (function () {
    function LoggerClass() {
        this.level = LogLevel.INFO; // Default to info and above
    }
    /**
     * @param tag Marks the source of the log. Usually `filename@functionName`
     * @param message the actual message
     */
    LoggerClass.prototype.error = function (tag, message) {
        if (!this.canLog(LogLevel.ERROR)) {
            return;
        }
        console.info(tag + ": " + message);
    };
    /**
     * @param tag Marks the source of the log. Usually `filename@functionName`
     * @param message the actual message
     */
    LoggerClass.prototype.warn = function (tag, message) {
        if (!this.canLog(LogLevel.WARN)) {
            return;
        }
        console.info(tag + ": " + message);
    };
    /**
     * @param tag Marks the source of the log. Usually `filename@functionName`
     * @param message the actual message
     */
    LoggerClass.prototype.info = function (tag, message) {
        if (!this.canLog(LogLevel.INFO)) {
            return;
        }
        console.info(tag + ": " + message);
    };
    /**
     * @param tag Marks the source of the log. Usually `filename@functionName`
     * @param message the actual message
     */
    LoggerClass.prototype.debug = function (tag, message) {
        if (!this.canLog(LogLevel.DEBUG)) {
            return;
        }
        console.debug(tag + ": " + message);
    };
    /**
     * @param tag Marks the source of the log. Usually `filename@functionName`
     * @param message the actual message
     */
    LoggerClass.prototype.verbose = function (tag, message) {
        if (!this.canLog(LogLevel.VERBOSE)) {
            return;
        }
        console.debug(tag + ": " + message);
    };
    LoggerClass.prototype.setLogLevel = function (level) {
        this.level = level;
    };
    LoggerClass.prototype.getLogLevel = function () {
        return this.level;
    };
    LoggerClass.prototype.canLog = function (level) {
        return level >= this.level;
    };
    return LoggerClass;
}());
exports.Logger = new LoggerClass();
