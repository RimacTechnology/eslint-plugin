import importDeclarationNewline from './rules/import-declaration-newline'

const configuration = {
    rules: {
        [importDeclarationNewline.name]: importDeclarationNewline.value,
    },
}

export = configuration
