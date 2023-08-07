
const envDev =
{
    INIT_CWD: process.env['INIT_CWD'],
    npm_config_local_prefix: process.env['npm_config_local_prefix'],
    npm_command: process.env['npm_command'],
    PWD: process.env['PWD'],
    npm_lifecycle_event: process.env['npm_lifecycle_event'],
    npm_package_name: process.env['npm_package_name'],
    HOME: process.env['HOME'],
}

module.exports = envDev;