import { TSESTree } from '@typescript-eslint/types'

import { createRule } from '../utils'

const NAME = 'import-declaration-newline'

const value = createRule({
    create(context) {
        return {
            ImportDeclaration(node) {
                // If only 1 import exit
                if (node.specifiers.length < 2) {
                    return
                }

                const sourceCode = context.getSourceCode()

                // Iterate trough each import node
                // E.g. import { A, B, C } from 'D' should iterate A, B, C
                for (let index = 1; index < node.specifiers.length; index++) {
                    // Take the current node (starting at 1) and previous node (0)
                    // E.g. import React, { useEffect, useState } from 'react'
                    //             ^^^^^    ^^^^^^^^^
                    const previousNode = node.specifiers[index - 1]
                    const currentNode = node.specifiers[index]

                    // E.g. import React, { useEffect, useState } from 'react'
                    // It's looking at React and useEffect
                    const areMultipleImportsOnSameLine = currentNode.loc.start.line === previousNode.loc.start.line

                    if (areMultipleImportsOnSameLine) {
                        // Default import is before named imports
                        // E.g. import React, { useState, useEffect } from 'react'
                        if (
                            currentNode.type === TSESTree.AST_NODE_TYPES.ImportSpecifier &&
                            previousNode.type === TSESTree.AST_NODE_TYPES.ImportDefaultSpecifier
                        ) {
                            // If there is default and named import, exit
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
                            const token = sourceCode.getFirstToken(currentNode)

                            // Exit if no named imports in braces or a single import
                            // E.g. import {} from 'react'
                            if (!token) {
                                return
                            }

                            // Get comma before the named import
                            // E.g. import { useState, useEffect } from 'react'
                            //                       ^
                            const comma = sourceCode.getTokenBefore(token)

                            // First named import shouldn't have a comma before it so exit
                            // E.g. import { useState, useEffect } from 'react'
                            //               ^^^^^^^^ => no comma before that variable
                            if (!comma) {
                                return
                            }

                            // Range from comma until the next variable
                            // E.g. import { useState, useEffect } from 'react'
                            //                        ^
                            const rangeAfterComma: TSESTree.Range = [
                                comma.range[1],
                                token.range[0],
                            ]

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

