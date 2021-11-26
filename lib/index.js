'use strict'
const exportDeclarationNewline = require('./rules/export-declaration-newline')
const importDeclarationNewline = require('./rules/import-declaration-newline')

// TODO: update naming here
module.exports = {
    rules: {
        'export-declaration-newline': exportDeclarationNewline,
        'import-declaration-newline': importDeclarationNewline,
    },
    configs: {
        recommended: {
            rules: {
                'eslint-plugin-modules-newline/export-declaration-newline':
                    'warn',
                'eslint-plugin-modules-newline/import-declaration-newline':
                    'warn',
            },
        },
    },
}
