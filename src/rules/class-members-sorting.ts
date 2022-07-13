import { ClassElement } from '@typescript-eslint/types/dist/generated/ast-spec'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule } from '../utils'

const NAME = 'class-members-sorting'

enum MEMBERS {
    STATIC_PROPERTIES = "static-properties",
    STATIC_METHODS = "static-methods",
    PUBLIC_PROPERTIES = "public-properties",
    PRIVATE_PROPERTIES = "private-properties",
    CONSTRUCTORS = "constructors",
    GETTERS = "getters",
    SETTERS = "setters",
    PUBLIC_METHODS = "public-methods",
    PRIVATE_METHODS = "private-methods",
    OTHER = "other",
}

const getType = (element: ClassElement) => {
    if (element.type === AST_NODE_TYPES.PropertyDefinition && element.static) {
        return MEMBERS.STATIC_PROPERTIES
    }

    if (element.type === AST_NODE_TYPES.MethodDefinition && element.static) {
        return MEMBERS.STATIC_METHODS
    }

    if (element.type === AST_NODE_TYPES.PropertyDefinition && element.accessibility === 'private') {
        return MEMBERS.PRIVATE_PROPERTIES
    }

    if (element.type === AST_NODE_TYPES.PropertyDefinition && element.accessibility === 'public') {
        return MEMBERS.PUBLIC_PROPERTIES
    }

    if (element.type === AST_NODE_TYPES.MethodDefinition && element.kind === 'constructor') {
        return MEMBERS.CONSTRUCTORS
    }

    if (
        element.type === AST_NODE_TYPES.MethodDefinition &&
        element.accessibility === 'private' &&
        element.kind !== 'get' &&
        element.kind !== 'set'
    ) {
        return MEMBERS.PRIVATE_METHODS
    }

    if (
        element.type === AST_NODE_TYPES.MethodDefinition &&
        element.accessibility === 'public' &&
        element.kind !== 'get' &&
        element.kind !== 'set'
    ) {
        return MEMBERS.PUBLIC_METHODS
    }

    if (element.type === AST_NODE_TYPES.MethodDefinition && element.kind === 'set') {
        return MEMBERS.SETTERS
    }

    if (element.type === AST_NODE_TYPES.MethodDefinition && element.kind === 'get') {
        return MEMBERS.GETTERS
    }

    return MEMBERS.OTHER
}

const value = createRule({
    create(context) {
        return {
            ClassBody(node) {
                const nodes: Record<MEMBERS, ClassElement[]> = {
                    "static-properties": [],
                    "static-methods": [],
                    "private-properties": [],
                    "public-properties": [],
                    constructors: [],
                    "private-methods": [],
                    "public-methods": [],
                    setters: [],
                    getters: [],
                    other: []
                }

                node.body.forEach((element: ClassElement) => {
                    const type = getType(element)

                    nodes[type].push(element)
                })

                const classContent = Object.values(nodes).reduce((accumulator, node) => {
                    const value = node.map((node) => {
                        if (node.type === AST_NODE_TYPES.MethodDefinition || node.type === AST_NODE_TYPES.PropertyDefinition) {
                            console.log( JSON.stringify(node) )

                            return ''
                        }

                        return ''
                    })

                    return accumulator + value.join(' ')
                }, '')

                context.report({
                    fix: (fixer) => {
                        return fixer.replaceTextRange(node.range, '{' + classContent + '}')
                    },
                    messageId: 'default',
                    loc: node.loc,
                })
            },
        }
    },
    defaultOptions: [],
    meta: {
        fixable: 'code',
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
