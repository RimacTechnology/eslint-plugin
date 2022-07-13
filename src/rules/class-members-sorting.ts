/* eslint-disable sort-keys-fix/sort-keys-fix */

import type { ClassElement } from '@typescript-eslint/types/dist/generated/ast-spec'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { createRule } from '../utils'

const NAME = 'class-members-sorting'

enum MEMBERS {
    CONSTRUCTORS = 'constructors',
    GETTERS = 'getters',
    OTHER = 'other',
    PRIVATE_METHODS = 'private-methods',
    PRIVATE_PROPERTIES = 'private-properties',
    PUBLIC_METHODS = 'public-methods',
    PUBLIC_PROPERTIES = 'public-properties',
    SETTERS = 'setters',
    STATIC_METHODS = 'static-methods',
    STATIC_PROPERTIES = 'static-properties'
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
                const sourceCode = context.getSourceCode()

                const classElements: Record<MEMBERS, ClassElement[]> = {
                    'static-properties': [],
                    'static-methods': [],
                    'private-properties': [],
                    'public-properties': [],
                    constructors: [],
                    'private-methods': [],
                    'public-methods': [],
                    setters: [],
                    getters: [],
                    other: [],
                }

                node.body.forEach((element) => { // @ts-expect-error
                    const type = getType(element)

                    // @ts-expect-error
                    classElements[type].push(element)
                })

                const classContent = Object.values(classElements).reduce((accumulator, classElementList) => {
                    const memberText = classElementList.map((classElement) => {
                        if (
                            classElement.type === AST_NODE_TYPES.MethodDefinition ||
                            classElement.type === AST_NODE_TYPES.PropertyDefinition
                        ) { // @ts-expect-error
                            const text = sourceCode.getText(classElement)

                            return `${text}\n`
                        }

                        return ''
                    })

                    return accumulator + memberText.join(' ')
                }, '')

                context.report({
                    fix: (fixer) => {
                        return fixer.replaceTextRange(node.range, `{\n${classContent}}`)
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
