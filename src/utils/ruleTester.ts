import path from 'path'

import { RuleTester } from '@typescript-eslint/experimental-utils/dist/eslint-utils'

export const ruleTester = new RuleTester({
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2015,
        project: './tsconfig.json',
        tsconfigRootDir: path.join(__dirname, '..', 'fixtures'),
    },
})
