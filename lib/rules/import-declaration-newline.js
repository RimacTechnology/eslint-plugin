const { IMPORT } = require('../constants')
const { lintModuleVariablesNewline } = require('./utils')

module.exports = {
    meta: { 
        type: "layout",
        fixable: 'code',
        schema: [],
        messages: {
            default: "Each import should be on an individual line."
        }
    },
    create: function (context) {
        return {
            ImportDeclaration(node) {
                lintModuleVariablesNewline(node, context, IMPORT)
            },
        }
    },
}
