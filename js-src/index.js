"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports and globals
var typescript_events_1 = require("typescript.events");
var eventEmitter = new typescript_events_1.Event();
var winston = require("winston");
var logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({ colorize: true })
    ]
});
logger.level = 'debug';
// Internal state
var dictionary = {};
// Public functions
function setDictionary(_dictionary) {
    if (!isEmpty(_dictionary) && hasCorrectFormat(_dictionary)) {
        dictionary = _dictionary;
        logger.debug("OK");
    }
    else {
        eventEmitter.emit("error", new Error("The input dictionary cannot be an empty JSON"));
        logger.debug("ERROR");
    }
}
exports.setDictionary = setDictionary;
function getMessage() {
}
exports.getMessage = getMessage;
// Private functions
function isEmpty(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
function hasCorrectFormat(_dictionary) {
    return true;
}
var input = {
    "Unable to connect to database": {
        "statusCode": 500,
        "message": "Internal Server Error"
    }
};
setDictionary(input);
