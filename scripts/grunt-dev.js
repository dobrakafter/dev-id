const fs = require('node:fs');
const path = require('node:path');
const env = require('./env-dev');
const { chdir } = require('node:process');
const { spawn, spawnSync } = require('node:child_process');

function exist(path) {
    return fs.existsSync(path);
}

function gruntBower(task) {
    let directory = path.join(...[env.PWD, 'bower'])
    chdir(directory);
    spawnSync('grunt', [task], { stdio: "inherit" })
}

if (process?.argv?.[2] && /dev:/.test(process.argv[2])) {
    gruntBower(process.argv[2]);
}
// console.log(env.HOME);
// console.log(env.PWD);
console.log(process.argv[2]);