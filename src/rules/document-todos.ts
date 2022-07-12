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

                for (const comment of comments) {
                    const value = comment.value
                    const url = context.settings.url as string

                    const isTodo = value.toLowerCase().includes('todo')
                    const isFixme = value.toLowerCase().includes('fixme')
                    const hasLink = value.toLowerCase().includes(url.toLowerCase())

                    // Valid todo/fixme comment
                    if ((isTodo || isFixme) && hasLink) {
                        continue
                    }

                    // Regular comment
                    if (!isTodo && !isFixme) {
                        continue
                    }

                    context.report({
                        loc: comment.loc,
                        messageId: 'default',
                    })
                }
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
            default: 'All TODOs and FIXMEs must have an issue link attached to them',
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
