"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports and globals
var events = require("events");
var eventEmitter = new events.EventEmitter();
var winston = require("winston");
var logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({ colorize: true })
    ]
});
logger.level = 'error';
// Internal state
var dictionary = undefined;
// Public functions
function setDictionary(_dictionary) {
    // Log
    logger.verbose("Trying to set the dictionary");
    // Validate the input
    if (!isEmpty(_dictionary)) {
        dictionary = _dictionary;
        emitEvent("dictionarySet");
        logger.verbose("Dictionary set correctly");
    }
    else {
        emitError("The input dictionary cannot be an empty JSON");
    }
}
exports.setDictionary = setDictionary;
function getMessage(error) {
    // Log
    logger.debug("Looking for the value of '" + error + "'");
    // Check if the dictionary is set
    if (isDictionaryDefined()) {
        // Look for a correspondence
        for (var key in dictionary) {
            if (key === error) {
                logger.verbose("The value of '" + key + "' is '" + JSON.stringify(dictionary[key], null, 2) + "'");
                emitEvent("correspondenceFound");
                return dictionary[key];
            }
        }
        // Emit an error if the key is not found
        emitError("There is no key on the dictionary with the following name: " + error);
        return null;
    }
    else {
        emitError("The dictionary cannot be empty");
    }
}
exports.getMessage = getMessage;
function setLoggerLevel(level) {
    // Check if it is a valid level
    var levels = ["none", "error", "warn", "info", "verbose", "debug", "silly"];
    if (isInArray(level, levels)) {
        logger.level = level;
        emitEvent("loggerLevelSet");
    }
    else {
        emitError("Invalid level. It has to be one of these values: " + levels + ";");
    }
}
exports.setLoggerLevel = setLoggerLevel;
function on(event, handler) {
    eventEmitter.on(event, handler);
}
exports.on = on;
function removeListener(event, handler) {
    eventEmitter.removeListener(event, handler);
}
exports.removeListener = removeListener;
// Private functions
function emitEvent(event) {
    //console.log("emitEvent -> "+event);
    eventEmitter.emit(event);
}
function isEmpty(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
function emitError(errorMessage) {
    eventEmitter.emit("error", new Error(errorMessage));
    logger.error(errorMessage);
}
function isDictionaryDefined() {
    return (dictionary !== undefined);
}
function isInArray(value, array) {
    logger.debug("Checking if '" + value + "' is contained in [" + array + "]");
    return array.indexOf(value) > -1;
}
