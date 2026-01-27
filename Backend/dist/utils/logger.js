"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = void 0;
exports.log = log;
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "Info";
    LogLevel["WARNING"] = "Warning";
    LogLevel["ERROR"] = "Error";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
function log(level, message, context) {
    const timestamp = new Date().toISOString().replace("T", " ").split(".")[0];
    const contextPart = context ? ` ${context}` : "";
    console.log(`[${level}] ${message}${contextPart} at ${timestamp}`);
}
