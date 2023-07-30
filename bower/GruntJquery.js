const path = require("node:path");
const util = require("lodash");

module.exports.jqueryConfig = {
    concat: {
        jquery: {
            files: {
                '../vendor/bower-asset/jquery/jquery.js': ['node_modules/jquery/dist/jquery.js'],
            },
        },
    },
    uglify: {
        jquery: {
            files: {
                '../vendor/bower-asset/jquery/jquery.min.js': ['../vendor/bower-asset/jquery/jquery.js'],
            },
        },
    }
}

