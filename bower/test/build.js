// PWD = bower/test/build.js

const path = require("path");
const _ = require("lodash");
const { chdir, cwd } = require("process");
const { spawnSync } = require("child_process");

const CWD = path.resolve(...['bower', 'test'])
const COMMAND = 'test';

/** @param {import("grunt")} grunt */
module.exports = function (grunt) {
    grunt.option('command', COMMAND);

    grunt.mergeConfig({
        test: {
            sass: {
                dist: {
                    options: { 'no-source-map': '' },
                    files: [
                        { expand: true, cwd: `${CWD}/src/scss`, src: ['test.scss'], dest: `${CWD}/dist/css`, ext: '.css' },
                    ]
                }
            },
            watch: {
                sass: {
                    files: [`${CWD}/src/scss/*.scss`],
                    tasks: [`${COMMAND}:sass`]
                },
            }
        },

    });

};