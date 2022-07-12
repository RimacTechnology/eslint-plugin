import { TSESTree } from '@typescript-eslint/types'

import { createRule } from '../utils'

const NAME = 'import-declaration-newline'

// TODO: make schema
const value = createRule({
    create(context) {
        return {
            Program() {
                const sourceCode = context.getSourceCode()
                const comments = sourceCode.getAllComments()

                comments.forEach((comment) => {
                    if (comment.value.includes(context.settings.url as string)) {
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

