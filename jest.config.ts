import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/**/*.test.ts'],
    verbose: false,
}

export default config
