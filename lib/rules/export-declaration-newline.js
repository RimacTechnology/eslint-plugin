const { EXPORT_NAMED } = require('../constants')
const { lintModuleVariablesNewline } = require('./utils')

module.exports = {
    meta: {
        fixable: 'code',
    },
    create: function (context) {
        return {
            ExportNamedDeclaration(node) {
                lintModuleVariablesNewline(node, context, EXPORT_NAMED)
            },
        }
    },
}
