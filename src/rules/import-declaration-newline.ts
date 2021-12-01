import { TSESTree } from '@typescript-eslint/types'

import { createRule } from '../utils'

const NAME = 'import-declaration-newline'

const value = createRule({
    create(context) {
        return {
            ImportDeclaration(node: TSESTree.ImportDeclaration) {
                // If only 1 import skip
                if (node.specifiers.length < 2) {
                    return
                }

                const sourceCode = context.getSourceCode()

                // Iterate trough each import node
                // E.g. import { A, B, C } from 'D' should go iterate A, B, C
                for (let index = 1; index < node.specifiers.length; index++) {
                    const previousNode = node.specifiers[index - 1]
                    const currentNode = node.specifiers[index]

                    // E.g import { A, B, C } from 'D'
                    // Its looking at A and B
                    const areMultipleImportsOnSameLine = currentNode.loc.start.line === previousNode.loc.start.line

                    if (areMultipleImportsOnSameLine) {
                        // Default import is before named imports
                        // E.g. import React, { useState, useEffect } from 'react'
                        if (
                            currentNode.type === TSESTree.AST_NODE_TYPES.ImportSpecifier &&
                            previousNode.type === TSESTree.AST_NODE_TYPES.ImportDefaultSpecifier
                        ) {
                            // Following is the case hence nothing to fix
                            // import React, { useState } from 'react'
                            if (node.specifiers.length <= 2) {
                                return null
                            }

                            // Find the brace where named imports begin
                            // import React, { useEffect, useState } from react
                            //               ^
                            const brace = sourceCode.tokensAndComments.find((token) => {
                                if (token.type === TSESTree.AST_TOKEN_TYPES.Punctuator && token.value === '{') {
                                    return true
                                }
                            })

                            if (!brace) {
                                return
                            }

                            // Replace starting brace with brace with new line
                            // OLD: {
                            // NEW: {\n
                            context.report({
                                fix: (fixer) => {
                                    return fixer.replaceTextRange([brace.range[0], brace.range[1]], '{\n')
                                },
                                messageId: 'default',
                                node,
                            })
                        } else {
                            // Token from import node
                            // E.g. import { A, B, C } from 'D' => this will be A
                            const firstToken = sourceCode.getFirstToken(currentNode)

                            // Exit if no named imports in braces or a single import
                            // E.g. import {} from 'react'
                            // E.g. import { useState } from 'react'
                            if (!firstToken) {
                                return
                            }

                            // Get comma before the named import
                            // E.g. import { useState, useEffect } from 'react'
                            //                       ^
                            const comma = sourceCode.getTokenBefore(firstToken)

                            // First named import shouldn't have a comma before it so exit
                            // E.g. import { useState, useEffect } from 'react'
                            //               ^^^^^^^^ => no comma before that word
                            if (!comma) {
                                return
                            }

                            const rangeAfterComma: TSESTree.Range = [
                                comma.range[1],
                                firstToken.range[0],
                            ]

                            // Don't fix comments between the comma and the next import
                            if (sourceCode.text.slice(rangeAfterComma[0], rangeAfterComma[1]).trim()) {
                                return null
                            }

                            // Replace comma with comma with new line
                            // E.g. useEffect, will be replaced with useEffect,\n
                            context.report({
                                fix: (fixer) => {
                                    return fixer.replaceTextRange(rangeAfterComma, '\n')
                                },
                                messageId: 'default',
                                node,
                            })
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

