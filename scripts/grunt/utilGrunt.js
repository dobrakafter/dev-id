const path = require('node:path');
const fs = require('node:fs');
const types = require('node:util/types');
const util = require('lodash');

/** @type {{expand:boolean,cwd:string,src:string[],dest:string,ext:string}} TFiles */
const TFiles = [];

/**
 * @typedef {object} TSass
 * @property {{dist:{files:TFiles[]}}} sass
 */

function isFile(paths) {
    return fs.existsSync(paths) && fs.lstatSync(paths).isFile()
}

function isDir(paths) {
    return fs.existsSync(paths) && fs.lstatSync(paths).isDirectory()
}

/**
 * @param {TFiles} options
 * @param {string} cwd
 */
function mapSassResolveFiles(options, cwd) {
    let paths = path.relative(process.cwd(), cwd)
    let dest = path.relative(process.cwd(), path.join(...[cwd, options.dest]))
    return Object.assign(options, {
        cwd: path.join(...[paths, options.cwd]),
        dest: dest,
    })
}

module.exports = {
    mapSassResolveFiles, isDir, isFile
}
