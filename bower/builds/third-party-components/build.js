// PWD = bower/builds/third-party-components/build.js

const path = require("path");
const _ = require("lodash");
const { chdir, cwd } = require("process");
const { spawnSync } = require("child_process");

const CWD = path.resolve(...['bower', 'builds', 'third-party-components'])
const COMMAND = 'builds:thirdPartyComponents';

/** @param {import("grunt")} grunt */
module.exports = function (grunt) {
    grunt.option('command', COMMAND);

    grunt.mergeConfig({
        builds: {
            thirdPartyComponents: {
            }
        },
    });
};