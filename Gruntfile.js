const path = require('node:path');
const types = require('node:util/types');
const util = require('util');
const _ = require('lodash');
const { isFile } = require('./scripts/grunt/utilGrunt');
const grunts = require('grunt');

/** @param {import("grunt")} grunt */
module.exports = function (grunt) {
    require('grunt-config-merge')(grunt);

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


    // task Test
    grunt.task.registerTask('test', ['sass', 'watch'], function (taskName) {
        require('./bower/test/build.js')(grunt);
        const command = grunt.option('command');
        const test = grunt.config.get('test');
        if (_.isString(command) && _.isString(taskName) && _.isObject(test)) {
            grunt.initConfig(test);
            grunt.task.run(taskName)
        }
    });

    // task builds:styles
    grunt.task.registerTask('builds:styles', ['sass', 'watch'], function (taskName) {
        require('./bower/builds/styles/build.js')(grunt);
        const command = grunt.option('command');
        const styles = grunt.config.get('builds.styles');
        if (_.isString(command) && _.isString(taskName) && _.isObject(styles)) {
            grunt.initConfig(styles);
            grunt.task.run(taskName)
        }
    });

    // task builds:bs-component
    grunt.task.registerTask('builds:bs-component', ['sass', 'watch'], function (taskName) {
        require('./bower/builds/bootstrap-component/build.js')(grunt);
        const command = grunt.option('command');
        const bsComponent = grunt.config.get('builds.bsComponent');
        if (_.isString(command) && _.isString(taskName) && _.isObject(bsComponent)) {
            grunt.initConfig(bsComponent);
            grunt.task.run(taskName)
        }
    });

    // task builds:jsThirdParty
    grunt.task.registerTask('builds:jsThirdParty', ['js', 'watch'], function (taskName) {
        require('./bower/builds/js-third-party/build.js')(grunt);
        const command = grunt.option('command');
        const jsThirdParty = grunt.config.get('builds.jsThirdParty');
        if (_.isString(command) && _.isString(taskName) && _.isObject(bsComponent)) {
            grunt.initConfig(jsThirdParty);
            grunt.task.run(taskName)
        }
    });

    // task builds:thirdPartyComponents
    grunt.task.registerTask('builds:thirdPartyComponents', ['js', 'watch'], function (taskName) {
        require('./bower/builds/third-party-components/build.js')(grunt);
        const command = grunt.option('command');
        const thirdPartyComponents = grunt.config.get('builds.thirdPartyComponents');
        if (_.isString(command) && _.isString(taskName) && _.isObject(bsComponent)) {
            grunt.initConfig(thirdPartyComponents);
            grunt.task.run(taskName)
        }
    });

    // task assets:bootstrap
    grunt.task.registerTask('assets:bootstrap', ['concat_css', 'watch'], function (taskName) {
        require('./bower/assets/bootstrap/build.js')(grunt);
        const command = grunt.option('command');
        const bootstrap = grunt.config.get('assets.bootstrap');
        if (_.isString(command) && _.isString(taskName) && _.isObject(bootstrap)) {
            grunt.initConfig(bootstrap);
            grunt.task.run(taskName)
        }
    });

    // task assets:jquery
    grunt.task.registerTask('assets:jquery', ['concat_js', 'concat'], function (taskName) {
        require('./bower/assets/jquery/build.js')(grunt);
        const command = grunt.option('command');
        const jquery = grunt.config.get('assets.jquery');
        if (_.isString(command) && _.isString(taskName) && _.isObject(jquery)) {
            grunt.initConfig(jquery);
            grunt.task.run(taskName)
        }
    });

    // task assets:dev
    grunt.task.registerTask('assets:dev', ['watch'], function (taskName) {
        require('./bower/assets/dev/build.js')(grunt);
        const command = grunt.option('command');
        const jquery = grunt.config.get('assets.dev');
        if (_.isString(command) && _.isString(taskName) && _.isObject(jquery)) {
            grunt.initConfig(jquery);
            grunt.task.run(taskName)
        }
    });


};
