/* eslint-disable sort-keys-fix/sort-keys-fix */

import rule from '../../../rules/import-declaration-newline'
import {
    TS_FILE_PATH,
    tsRuleTester,
} from '../utils'

// NOTE: output is formatter weirdly because this plugin should only be concerned about import new lines, other rules handle indentation
tsRuleTester.run(rule.name, rule.value, {
    invalid: [
        {
            code: `
import {
    k1, k2
} from "something"
            `,
            filename: TS_FILE_PATH,
            errors: [
                {
                    column: 1,
                    line: 2,
                    messageId: 'default',
                },
            ],
            output: `
import {
    k1,
k2
} from "something"
            `,
        },
        {
            code: 'import { k1, k2, k3 } from "something"',
            filename: TS_FILE_PATH,
            errors: [
                {
                    column: 1,
                    line: 1,
                    messageId: 'default',
                },
                {
                    column: 1,
                    line: 1,
                    messageId: 'default',
                },
            ],
            output: `import { k1,
k2,
k3 } from "something"`,
        },
        {
            code: 'import React, { useState, useEffect } from "react"',
            filename: TS_FILE_PATH,
            errors: [
                {
                    column: 1,
                    line: 1,
                    messageId: 'default',
                },
                {
                    column: 1,
                    line: 1,
                    messageId: 'default',
                },
            ],
            output: `import React, {
 useState,
useEffect } from "react"`,
        },
        {
            code: `import React, { useState,
useEffect } from "react"`,
            filename: TS_FILE_PATH,
            errors: [
                {
                    column: 1,
                    line: 1,
                    messageId: 'default',
                },
            ],
            output: `import React, {
 useState,
useEffect } from "react"`,
        },
    ],
    valid: [
        {
            code: `import {
k1,
k2,
k3,
k4,
k5
} from 'something'`,
            filename: TS_FILE_PATH,
        },
        {
            code: 'import { k1 } from \'something\'',
            filename: TS_FILE_PATH,
        },
        {
            code: 'import {} from \'something\'',
            filename: TS_FILE_PATH,
        },
        {
            code: 'import React, { useState } from \'react\'',
            filename: TS_FILE_PATH,
        },
        {
            code: `import React, {
useState,
useEffect,
} from 'react'`,
            filename: TS_FILE_PATH,
        },
    ],
})
