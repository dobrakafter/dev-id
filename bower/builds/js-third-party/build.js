// PWD = bower/builds/js-third-party/build.js

const path = require("path");
const _ = require("lodash");
const { chdir, cwd } = require("process");
const { spawnSync } = require("child_process");

const CWD = path.resolve(...['bower', 'builds', 'js-third-party'])
const COMMAND = 'builds:jsThirdParty';

/** @param {import("grunt")} grunt */
module.exports = function (grunt) {
    grunt.option('command', COMMAND);

    grunt.mergeConfig({
        builds: {
            jsThirdParty: {
            }
        },
    });

};