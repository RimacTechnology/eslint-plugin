const { EXPORT_NAMED } = require('../constants')
const { lintModuleVariablesNewline } = require('./utils')

module.exports = {
    meta: { 
        type: "layout", 
        fixable: 'code',
        schema: [],
        messages: {
            default: "Each export should be on an individual line."
        }
    },
    create: function (context) {
        return {
            ExportNamedDeclaration(node) {
                lintModuleVariablesNewline(node, context, EXPORT_NAMED)
            },
        }
    },
}
