import { ClassElement } from '@typescript-eslint/types/dist/generated/ast-spec'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule } from '../utils'

const NAME = 'class-members-sorting'

const MEMBER_ORDER = [
    "static-properties",
    "static-methods",
    "public-properties",
    "private-properties",
    "constructor",
    "getters",
    "setters",
    "public-methods",
    "private-methods",
    "other",
] as const

const getType = (element: ClassElement) => {
    if (element.type === AST_NODE_TYPES.PropertyDefinition && element.static)
    console.log(element.type.toString())
}

const value = createRule({
    create(context) {
        return {
            ClassBody(node) {
                const nodes: Record<typeof MEMBER_ORDER[number], ClassElement[]> = {
                    "private-methods": [],
                    "private-properties": [],
                    "public-methods": [],
                    "public-properties": [],
                    "static-methods": [],
                    constructor: [],
                    "static-properties": [],
                    setters: [],
                    getters: [],
                    other: []
                }

                node.body.forEach((element) => {
                    // TODO: handle type
                    getType(element as ClassElement)
                })

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
