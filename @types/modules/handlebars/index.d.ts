
export { }

import Handlebars = require('../../../bower/node_modules/handlebars/runtime')

declare module "handlebar" {
    export = Handlebars
}

declare global {
}