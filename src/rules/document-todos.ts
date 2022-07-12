import { TSESTree } from '@typescript-eslint/types'

import { createRule } from '../utils'

const NAME = 'import-declaration-newline'

// TODO: make schema
// TODO: type settings
const value = createRule({
    create(context) {
        return {
            Program() {
                const sourceCode = context.getSourceCode()
                const comments = sourceCode.getAllComments()

                comments.forEach((comment) => {
                    const value = comment.value
                    const url = context.settings.url as string
                    const isTodo = value.toLowerCase().includes('todo')
                    const isFixme = value.toLowerCase().includes('fixme')

                    if (
                        (isTodo || isFixme) &&
                        value.includes(url.toLowerCase())
                    ) {
                        return 
                    }

                    context.report({
                        messageId: 'default',
                        loc: comment.loc,
                    })
                })
            },
        }
    },
    defaultOptions: [],
    meta: {
        docs: {
            description: 'Ensure all TODOs and FIXMEs have an issue link attached to them',
            recommended: false,
            requiresTypeChecking: false,
        },
        messages: {
            default: 'All TODOs and FIXMEs have an issue link attached to them',
        },
        schema: [],
        type: 'problem',
    },
    name: NAME,
})

export default {
    name: NAME,
    value,
}

