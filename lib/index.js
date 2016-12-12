"use strict";

const forEach = require("iterate-object");

let replacements = {};
module.exports = (config, bloggify) => {
    forEach(config, (val, name) => exports.add(name, val));
    bloggify.server.hook("after", "*", "all", lien => {
        if (typeof lien.content !== "string") {
            return;
        }
        forEach(replacements, (replaceWith, what) => {
            let replaced = lien.content.replace(what, replaceWith)
            lien.content = replaced;
        });
    });
};

exports.add = function (name, val) {
    replacements[name] = val;
};
