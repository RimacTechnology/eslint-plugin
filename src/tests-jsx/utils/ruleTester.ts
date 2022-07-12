import * as path from 'path'

import { ESLintUtils } from '@typescript-eslint/utils'

export const ruleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2015,
        project: './tsconfig.json',
        tsconfigRootDir: path.resolve(__dirname, '..'),
    },
})
