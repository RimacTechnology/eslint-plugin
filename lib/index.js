'use strict'

const exportDeclarationNewline = require('./rules/export-declaration-newline')
const importDeclarationNewline = require('./rules/import-declaration-newline')

module.exports = {
    rules: {
        'export-declaration-newline': exportDeclarationNewline,
        'import-declaration-newline': importDeclarationNewline,
    },
    configs: {
        recommended: {
            rules: {
                'eslint-plugin-rimac/export-declaration-newline': 'warn',
                'eslint-plugin-rimac/import-declaration-newline': 'warn',
            },
        },
    },
}
