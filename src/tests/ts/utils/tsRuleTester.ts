import * as path from 'path'

import { ESLintUtils } from '@typescript-eslint/utils'

export const tsRuleTester = new ESLintUtils.RuleTester({
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2015,
        project: './tsconfig.json',
        tsconfigRootDir: path.resolve(__dirname, '..'),
    },
})
