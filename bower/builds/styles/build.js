// PWD = bower/styles/build.js

const path = require("path");
const _ = require("lodash");
const { chdir, cwd } = require("process");
const { spawnSync } = require("child_process");

const CWD = path.resolve(...['bower', 'builds', 'styles'])
const COMMAND = 'builds:styles';

/** @param {import("grunt")} grunt */
module.exports = function (grunt) {
    grunt.option('command', COMMAND);

    grunt.mergeConfig({
        builds: {
            styles: {
                sass: {
                    dist: {
                        options: { 'no-source-map': '' },
                        files: [
                            { expand: true, cwd: `${CWD}/typography/src/scss`, src: ['typography.scss'], dest: `${CWD}/typography/dist/css`, ext: '.css' },
                            { expand: true, cwd: `${CWD}/font/src/scss`, src: ['font.scss'], dest: `${CWD}/font/dist/css`, ext: '.css' },
                            { expand: true, cwd: `${CWD}/layout/src/scss`, src: ['layout.scss'], dest: `${CWD}/layout/dist/css`, ext: '.css' },
                            { expand: true, cwd: `${CWD}/elevation/src/scss`, src: ['elevation.scss'], dest: `${CWD}/elevation/dist/css`, ext: '.css' },
                            { expand: true, cwd: `${CWD}/utilities/src/scss`, src: ['utilities.scss'], dest: `${CWD}/utilities/dist/css`, ext: '.css' },
                            { expand: true, cwd: `${CWD}/material-icons/src/scss`, src: ['material-icons.scss'], dest: `${CWD}/material-icons/dist/css`, ext: '.css' },
                        ]
                    }
                },
                concat_css: {
                    all: {
                        src: [
                            `${CWD}/typography/dist/css/*.css`,
                            `${CWD}/font/dist/css/*.css`,
                            `${CWD}/elevation/dist/css/*.css`,
                            `${CWD}/utilities/dist/css/*.css`,
                            `${CWD}/layout/dist/css/*.css`,
                            `${CWD}/material-icons/dist/css/*.css`,
                        ],
                        dest: `${CWD}/dist/css/styles.css`
                    }
                },
                concat: {
                    js: {
                        files: () => {
                            let obj = new Object(null)
                            // obj[`${CWD}/vendor/dist/js/vendor.js`] = `${CWD}/vendor/src/js/*.js`;
                            return obj;
                        },
                    },
                    dist: {
                        src: [
                        ],
                        dest: `${CWD}/dist/js/styles.js`
                    }
                },
                watch: {
                    sass: {
                        files: [`${CWD}/*/src/scss/*.scss`, `${CWD}/**/*.scss`],
                        tasks: [
                            `${COMMAND}:sass`,
                            `${COMMAND}:concat_css`,
                            `assets:bootstrap:concat_css`,
                            `assets:bootstrap:copy`,
                        ]
                    },
                    js: {
                        files: [`${CWD}/*/src/js/*.js`],
                        tasks: []
                    },
                }
            }
        },
    });

};