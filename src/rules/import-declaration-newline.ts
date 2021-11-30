import type { ReportFixFunction } from '@typescript-eslint/experimental-utils/dist/ts-eslint'
import type { TSESTree } from '@typescript-eslint/types'

import { createRule } from '../utils'

const NAME = 'import-declaration-newline'

const value = createRule({
    create(context) {
        return {
            ImportDeclaration(node: TSESTree.ImportDeclaration) {
                const moduleType = 'IMPORT'

                // If only 1 import skip
                if (node.specifiers.length < 2) {
                    return null
                }

                const sourceCode = context.getSourceCode()

                let moduleVariables = node.specifiers

                if (!moduleVariables) {
                    return null
                }

                for (let index = 1; index < moduleVariables.length; index++) {
                    const firstTokenOfCurrentProperty = sourceCode.getFirstToken(moduleVariables[index])

                    if (moduleVariables[index].loc.start.line === moduleVariables[index - 1].loc.start.line) {
                        const report = (fixer: ReportFixFunction) => {
                            context.report({
                                fix: fixer,
                                messageId: 'default',
                                node,
                            })
                        }

                        const localSourceCode = context.getSourceCode()

                        const namedImportAfterDefault = moduleType === 'IMPORT'
                                && node.specifiers[index].type === 'ImportSpecifier'
                                && (
                                    node.specifiers[index - 1]
                                    && node.specifiers[index - 1].type === 'ImportDefaultSpecifier'
                                )

                        if (namedImportAfterDefault) {
                            if (moduleVariables.length <= 2) {
                                return null
                            }

                            const endOfDefaultImport = node.specifiers[index - 1].range[1]
                            const beginningOfNamedImport = node.specifiers[index].range[0]

                            const brace = localSourceCode.tokensAndComments.find(
                                (token) => token.type === 'Punctuator'
                                        && token.value === '{'
                                        && token.range[0] >= endOfDefaultImport
                                        && token.range[1] <= beginningOfNamedImport
                            )

                            if (!brace?.range[0]) {
                                return
                            }

                            const rangeAfterBrace: TSESTree.Range = [brace?.range[0], brace?.range[1]]

                            report((fixer) => fixer.replaceTextRange(rangeAfterBrace, '{\n'))
                        } else {
                            if (!firstTokenOfCurrentProperty) {
                                return
                            }

                            const comma = localSourceCode.getTokenBefore(firstTokenOfCurrentProperty)

                            if (!comma) {
                                return
                            }

                            const rangeAfterComma: TSESTree.Range = [
                                comma.range[1],
                                firstTokenOfCurrentProperty.range[0],
                            ]

                            // don't fix if comments between the comma and the next property.
                            if (localSourceCode.text.slice(rangeAfterComma[0], rangeAfterComma[1]).trim()) {
                                return null
                            }

                            report((fixer) => fixer.replaceTextRange(rangeAfterComma, '\n'))
                        }
                    }
                }
            },
        }
    },
    defaultOptions: [],
    meta: {
        docs: {
            description: 'Ensures multiple inline imports are broken into multiple lines.',
            recommended: false,
            requiresTypeChecking: true,
        },
        fixable: 'code',
        messages: {
            default: 'Each import should be on an individual line.',
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

