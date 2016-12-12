"use strict";

var forEach = require("iterate-object");

var replacements = {};
module.exports = function (config, bloggify) {
    forEach(config, function (val, name) {
        return exports.add(name, val);
    });
    bloggify.server.hook("after", "*", "all", function (lien) {
        if (typeof lien.content !== "string") {
            return;
        }
        forEach(replacements, function (replaceWith, what) {
            var replaced = lien.content.replace(what, replaceWith);
            lien.content = replaced;
        });
    });
};

exports.add = function (name, val) {
    replacements[name] = val;
};