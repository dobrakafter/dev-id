const { Select2Grunt } = require("select2/Gruntfile");
const path = require("node:path");
const util = require("lodash");
const { mapSassResolveFiles } = require("../scripts/grunt/utilGrunt");
const { jqueryConfig } = require("./GruntJquery");

/** @param {import("grunt")} grunt */
module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                files: [
                    { expand: true, cwd: 'node_modules/bootstrap/scss', src: ['bootstrap.scss'], dest: '../vendor/bower-asset/bootstrap/src/css', ext: '.css' },
                    {
                        expand: true, cwd: 'node_modules/select2/src/scss', src: ['core.scss'], dest: '../vendor/bower-asset/bootstrap/src/css', ext: '.css',
                        rename: function (src, dest) {
                            return `${src}/${dest.replace(/core/, 'select2')}`
                        }
                    },
                    { expand: true, cwd: 'node_modules/@eonasdan/tempus-dominus/src/scss', src: ['tempus-dominus.scss'], dest: '../vendor/bower-asset/bootstrap/src/css', ext: '.css' },
                ]
            }
        },

        concat: {
            dev: {
                files: {
                    '../vendor/bower-asset/bootstrap/src/js/bootstrap.js': ['node_modules/bootstrap/dist/js/bootstrap.js'],
                    '../vendor/bower-asset/bootstrap/src/js/select2.js': ['node_modules/select2/dist/js/select2.full.js'],
                    '../vendor/bower-asset/bootstrap/src/js/typeahead.js': ['node_modules/typeahead.js/dist/typeahead.bundle.js'],
                    '../vendor/bower-asset/bootstrap/src/js/tempus-dominus.js': ['node_modules/@eonasdan/tempus-dominus/dist/js/tempus-dominus.js'],
                    '../vendor/bower-asset/bootstrap/src/js/moment.js': ['node_modules/moment/moment.js', 'node_modules/moment/locale/id.js'],
                    '../vendor/bower-asset/bootstrap/src/js/popper.js': ['node_modules/popper.js/dist/umd/popper.js'],
                    '../vendor/bower-asset/bootstrap/src/js/infinite-scroll.js': ['node_modules/infinite-scroll/dist/infinite-scroll.pkgd.js'],
                    '../vendor/bower-asset/bootstrap/src/js/handlebars.js': ['node_modules/handlebars/dist/handlebars.js'],
                },
            },
        },
    })

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

    grunt.registerTask('dev:jquery', 'jquery', function () {
        grunt.config.merge(jqueryConfig);
        grunt.task.run('concat:jquery')
        //grunt.task.run('uglify:jquery')
    })

    grunt.registerTask('dev:bower:bootstrap', ['sass', 'concat'], function () {
        grunt.task.run('sass')
        grunt.task.run('concat')
    })
};