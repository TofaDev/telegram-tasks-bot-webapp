"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARNING"] = 2] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    constructor(logLevel) {
        this.logLevel = logLevel;
    }
    shouldLog(logLevel) {
        return this.logLevel <= logLevel;
    }
    debug(text) {
        if (this.shouldLog(LogLevel.DEBUG))
            console.log(`[DEBUG]: ${text}`);
    }
    info(text) {
        if (this.shouldLog(LogLevel.INFO))
            console.log(`[INFO]: ${text}`);
    }
    error(text) {
        if (this.shouldLog(LogLevel.ERROR))
            console.log(`[ERROR]: ${text}`);
    }
    warning(text) {
        if (this.shouldLog(LogLevel.WARNING))
            console.log(`[WARNING]: ${text}`);
    }
}
exports.Logger = Logger;
