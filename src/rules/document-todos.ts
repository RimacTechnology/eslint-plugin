import { createRule } from '../utils'

const NAME = 'document-todos'

const value = createRule<Record<string, string>[], string>({
    create(context) {
        return {
            Program() {
                const url = context.options[0]?.url

                if (!url) {
                    throw new Error(`URL not set for the ${NAME} rule. Please set the URL.`)
                }

                const sourceCode = context.getSourceCode()
                const comments = sourceCode.getAllComments()

                for (const comment of comments) {
                    const isTodo = comment.value.toLowerCase().includes('todo')
                    const isFixme = comment.value.toLowerCase().includes('fixme')
                    const hasLink = comment.value.toLowerCase().includes(url.toLowerCase())

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
        schema: [{
            additionalProperties: false,
            properties: {
                url: {
                    type: 'string',
                },
            },
            type: 'object',
        }],
        type: 'problem',
    },
    name: NAME,
})

export default {
    name: NAME,
    value,
}
