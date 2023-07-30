# Gruntfile.js

```js
const config = {
    pkg: (grunt) => grunt.file.readJSON('package.json'),
    sass: {
        dist: {
            files: [
                { expand: true, cwd: 'bower/node_modules/bootstrap/scss', src: ['bootstrap.scss'], dest: 'vendor/bower-asset/src/css', ext: '.css' }]
        }
    }
}
module.exports = function (grunt) {

    grunt.initConfig({
        // pkg: grunt.file.readJSON('../../package.json'),
        sass: config.sass
    })

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
};

module.exports.GruntBootstrap = function (grunt) {
    console.log(process.cwd());
    console.log();
    return grunt.initConfig({
        sass: config.sass
    });
}

```