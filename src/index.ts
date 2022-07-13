import classMembersSorting from './rules/class-members-sorting'
import documentTodos from './rules/document-todos'
import importDeclarationNewline from './rules/import-declaration-newline'

const configuration = {
    rules: {
        [importDeclarationNewline.name]: importDeclarationNewline.value,
        [documentTodos.name]: documentTodos.value,
        [classMembersSorting.name]: classMembersSorting.value,
    },
}

export = configuration
