const path = require('node:path');
const types = require('node:util/types');
const util = require('util');
const { isFile } = require('./scripts/grunt/utilGrunt');
const grunts = require('grunt');

/** @param {import("grunt")} grunt */
module.exports = function (grunt) {

    grunt.initConfig({});


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

};
