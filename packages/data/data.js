"use strict";
exports.__esModule = true;
exports.getVersions = exports.getEvents = void 0;
var events_json_1 = require("./events.json");
var versions_json_1 = require("./versions.json");
function getEvents() {
    return events_json_1["default"];
}
exports.getEvents = getEvents;
function getVersions() {
    return versions_json_1["default"];
}
exports.getVersions = getVersions;
