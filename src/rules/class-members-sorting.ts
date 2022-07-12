import { createRule } from '../utils'

const NAME = 'class-members-sorting'

const value = createRule({
    create(context) {
        return {
            ClassDeclaration() {

            },
        }
    },
    defaultOptions: [],
    meta: {
        docs: {
            description: 'Ensure class members are sorted.',
            recommended: false,
            requiresTypeChecking: true,
        },
        messages: {
            default: 'Class members must be sorted.',
        },
        schema: [],
        type: 'layout',
    },
    name: NAME,
})

export default {
    name: NAME,
    value,
}
