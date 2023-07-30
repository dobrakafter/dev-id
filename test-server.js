const grunt = require('grunt');
const _ = require('lodash');


/** @param {import("grunt")} grunt */
function testGrunt(grunt) {
    grunt.initConfig({
        bootstrap: {
            sass: {

            }
        }
    });

    grunt.registerTask('dev', ['bootstrap'])

    // console.log(grunt.config.get('bootstrap'));
    // console.log(grunt.config);
    // console.log(grunt.task);
    // console.log(grunt.task.exists('dev'));
}

// testGrunt(grunt)