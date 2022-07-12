/* eslint-disable sort-keys-fix/sort-keys-fix */

import rule from '../../../rules/document-todos'
import {
    jsxRuleTester,
    TSX_FILE_PATH,
} from '../utils'

type OptionType = Record<string, string>

const options: OptionType[] = [{
    url: 'https://rimac-automobili.atlassian.net/jira/software/c/projects/',
}]

jsxRuleTester.run<string, Record<string, string>[]>(rule.name, rule.value, {
    invalid: [
        {
            code: `
// FIXME: I'm not documented
const Component = () => {
    return (
        <div 
            props={true}
            style={{ height: '50px' }}
        >
            <p>Hello</p>
        </div>
    )
}
            `,
            filename: TSX_FILE_PATH,
            options,
            errors: [
                {
                    line: 2,
                    messageId: 'default',
                },
            ],
        },
        {
            code: `
const Component = () => {
    return (
        <div 
            props={true}
            // TODO: I'm not documented
            style={{ height: '50px' }}
        >
            <p>Hello</p>
        </div>
    )
}
            `,
            filename: TSX_FILE_PATH,
            options,
            errors: [
                {
                    line: 6,
                    messageId: 'default',
                },
            ],
        },
        {
            code: `
const Component = () => {
    return (
        <div 
            props={true}
            style={{ height: '50px' }}
        >
            {/* TODO: I'm not documented */}
            <p>Hello</p>
        </div>
    )
}
            `,
            filename: TSX_FILE_PATH,
            options,
            errors: [
                {
                    line: 8,
                    messageId: 'default',
                },
            ],
        },
        {
            code: `
const Component = () => {
    /**
     * What is happening
     * TODO: Where is the link
     */
    return (
        <div 
            props={true}
            style={{ height: '50px' }}
        >
            <p>Hello</p>
        </div>
    )
}
            `,
            filename: TSX_FILE_PATH,
            options,
            errors: [
                {
                    line: 3,
                    messageId: 'default',
                },
            ],
        },
        {
            code: `
// TODO: another one
const Component = () => {
    /**
     * What is happening
     * TODO: Where is the link
     */
    return (
        <div 
            props={true}
            // TODO: and another one
            style={{ height: '50px' }}
        >
            {/* TODO: last one */}
            <p>Hello</p>
        </div>
    )
}
            `,
            filename: TSX_FILE_PATH,
            options,
            errors: [
                {
                    line: 2,
                    messageId: 'default',
                },
                {
                    line: 4,
                    messageId: 'default',
                },
                {
                    line: 11,
                    messageId: 'default',
                },
                {
                    line: 14,
                    messageId: 'default',
                },
            ],
        },
    ],
    valid: [
        {
            code: `
const Component = () => {
    return (
        <div 
            props={true}
            style={{ height: '50px' }}
        >
            <p>Hello</p>
        </div>
    )
}
`,
            options,
            filename: TSX_FILE_PATH,
        },
        {
            code: `
// Just a plain old comment
const Component = () => {
    /**
     * What is happening
     * Who am I?
     */
    return (
        <div 
            props={true}
            // Prop dude
            style={{ height: '50px' }}
        >
            {/* JSX dude */}
            <p>Hello</p>
        </div>
    )
}
`,
            options,
            filename: TSX_FILE_PATH,
        },
        {
            code: `
// TODO: something is wrong https://rimac-automobili.atlassian.net/jira/software/c/projects/QIA/5887
const Component = () => {
    return (
        <div 
            props={true}
            style={{ height: '50px' }}
        >
            <p>Hello</p>
        </div>
    )
}
`,
            options,
            filename: TSX_FILE_PATH,
        },
        {
            code: `
const Component = () => {
    return (
        <div 
            props={true}
            // FIXME: something is wrong https://rimac-automobili.atlassian.net/jira/software/c/projects/QIA/5887
            style={{ height: '50px' }}
        >
            <p>Hello</p>
        </div>
    )
}
`,
            options,
            filename: TSX_FILE_PATH,
        },
        {
            code: `
const Component = () => {
    return (
        <div 
            props={true}
            style={{ height: '50px' }}
        >
            {/* FIXME: something is wrong https://rimac-automobili.atlassian.net/jira/software/c/projects/QIA/5887j */}
            <p>Hello</p>
        </div>
    )
}
`,
            options,
            filename: TSX_FILE_PATH,
        },
        {
            code: `
const Component = () => {
    /**
     * What is happening
     *  TODO: something is wrong https://rimac-automobili.atlassian.net/jira/software/c/projects/QIA/5887j 
     */
    return (
        <div 
            props={true}
            style={{ height: '50px' }}
        >
            <p>Hello</p>
        </div>
    )
}
`,
            options,
            filename: TSX_FILE_PATH,
        },
    ],
})
