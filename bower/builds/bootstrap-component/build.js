// PWD = bower/builds/bootstrap-component/build.js

const path = require("path");
const _ = require("lodash");
const { chdir, cwd } = require("process");
const { spawnSync } = require("child_process");

const CWD = path.resolve(...['bower', 'builds', 'bootstrap-component'])
const COMMAND = 'builds:bs-component';

function concatFiles() {
    let obj = new Object(null)
    obj[`${CWD}/vendor/dist/js/vendor.js`] = `${CWD}/vendor/src/js/*.js`;
    obj[`${CWD}/form/dist/js/form.js`] = `${CWD}/form/src/js/*.js`;
    obj[`${CWD}/checkbox/dist/js/checkbox.js`] = `${CWD}/checkbox/src/js/*.js`;
    obj[`${CWD}/switch/dist/js/switch.js`] = `${CWD}/switch/src/js/*.js`;
    obj[`${CWD}/radio-group/dist/js/radio-group.js`] = `${CWD}/radio-group/src/js/*.js`;
    return obj;
}

/** @param {import("grunt")} grunt */
module.exports = function (grunt) {
    grunt.option('command', COMMAND);
    grunt.mergeConfig({
        builds: {
            bsComponent: {
                sass: {
                    dist: {
                        options: { 'no-source-map': '' },
                        files: [
                            { expand: true, cwd: `${CWD}/vendor/src/scss`, src: ['vendor.scss'], dest: `${CWD}/vendor/dist/css`, ext: '.css' },
                            { expand: true, cwd: `${CWD}/form/src/scss`, src: ['form.scss'], dest: `${CWD}/form/dist/css`, ext: '.css' },
                            { expand: true, cwd: `${CWD}/checkbox/src/scss`, src: ['checkbox.scss'], dest: `${CWD}/checkbox/dist/css`, ext: '.css' },
                            { expand: true, cwd: `${CWD}/switch/src/scss`, src: ['switch.scss'], dest: `${CWD}/switch/dist/css`, ext: '.css' },
                            { expand: true, cwd: `${CWD}/radio-group/src/scss`, src: ['radio-group.scss'], dest: `${CWD}/radio-group/dist/css`, ext: '.css' },
                        ]
                    }
                },
                concat_css: {
                    all: {
                        src: [
                            `${CWD}/vendor/dist/css/*.css`,
                            `${CWD}/form/dist/css/*.css`,
                            `${CWD}/radio-group/dist/css/*.css`,
                            `${CWD}/switch/dist/css/*.css`,
                            `${CWD}/checkbox/dist/css/*.css`,
                        ],
                        dest: `${CWD}/dist/css/bootstrap-component.css`
                    }
                },
                concat: {
                    js: {
                        files: concatFiles(),
                    },
                    dist: {
                        src: [
                            `${CWD}/vendor/dist/js/vendor.js`,
                            `${CWD}/form/dist/js/form.js`,
                            `${CWD}/radio-group/dist/js/radio-group.js`,
                            `${CWD}/switch/dist/js/switch.js`,
                            `${CWD}/checkbox/dist/js/checkbox.js`,
                        ],
                        dest: `${CWD}/dist/js/bootstrap-component.js`
                    }
                },
                watch: {
                    sass: {
                        files: [`${CWD}/*/src/scss/*.scss`],
                        tasks: [`${COMMAND}:sass`]
                    },
                    js: {
                        files: [`${CWD}/*/src/js/*.js`],
                        tasks: [`${COMMAND}:concat:js`, `${COMMAND}:concat:dist`]
                    },
                }
            }
        },
    });

};