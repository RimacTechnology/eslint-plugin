import rule from '../../rules/import-declaration-newline'
import { ruleTester } from '../ruleTester'

ruleTester.run(rule.name, rule.value, {
    invalid: [
        {
            code: 'import {\nk1, k2\n} from \'something\';',
            errors: [
                {
                    column: 1,
                    line: 1,
                    messageId: 'default',
                },
            ],
            output: 'import {\nk1,\nk2\n} from \'something\';',
        },
        {
            code: 'import { k1, k2, k3 } from \'something\';',
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
            output: 'import { k1,\nk2,\nk3 } from \'something\';',
        },
        {
            code: 'import React, { useState, useEffect } from \'react\';',
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
            output: 'import React, {\n useState,\nuseEffect } from \'react\';',
        },
        {
            code: 'import React, { useState,\nuseEffect } from \'react\';',
            errors: [
                {
                    column: 1,
                    line: 1,
                    messageId: 'default',
                },
            ],
            output: 'import React, {\n useState,\nuseEffect } from \'react\';',
        },
    ],
    valid: [
        'import {\nk1,\nk2,\nk3,\nk4,\nk5\n} from \'something\';',
        'import {\nk1\n, k2\n, k3\n,k4\n} from \'something\';',
        'import { k1,\nk2,\nk3,\nk4 } from \'something\';',
        'import { k1\n, k2\n, k3\n, k4 } from \'something\';',
        'import { k1 } from \'something\';',
        'import {\nk1\n} from \'something\';',
        'import {} from \'something\';',
        'import React, { useState } from \'react\';',
        'import React, {\nuseState } from \'react\';',
        'import React, {\nuseState, \nuseEffect } from \'react\'',
    ],
})
