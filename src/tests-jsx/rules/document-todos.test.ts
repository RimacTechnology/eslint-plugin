/* eslint-disable sort-keys-fix/sort-keys-fix */

import rule from '../../rules/document-todos'
import {
    ruleTester, 
    TSX_FILE_PATH,
} from '../utils'

// TODO: check if comment include todo first
ruleTester.run(rule.name, rule.value, {
    invalid: [
        {
            code: `
// TODO: comment above the function https://rimac-automobili.atlassian.net/jira/software/c/projects/QIA/boards/34/backlog?view=detail&selectedIssue=QIA-965&epics=visible&issueLimit=100
const Component = () => {
    /**
     * This is a comment block
     * TODO: and this is his todo https://rimac-automobili.atlassian.net/jira/software/c/projects/QIA/boards/34/backlog?view=detail&selectedIssue=QIA-965&epics=visible&issueLimit=100
     */
    const router = useRouter()

    // This is just a regular comment
    const something = 1

    // FIXME: comment above the return
    return (
        <div 
            props={true}
            // TODO: and this is his todo https://rimac-automobili.atlassian.net/jira/software/c/projects/QIA/boards/34/backlog?view=detail&selectedIssue=QIA-965&epics=visible&issueLimit=100
            style={{ height: '50px' }}
        >
            {/* TODO: this is a different jsx comment */}
            <p>Hello</p>
            {/* This is a regular jsx comment */}
            <p>Hello</p>
        </div>
    )
}
            `,
            filename: TSX_FILE_PATH,
            settings: {
                url: 'https://rimac-automobili.atlassian.net/jira/software/c/projects/'
            },
            errors: [
                {
                    column: 1,
                    line: 2,
                    messageId: 'default',
                },
            ],
        }
    ],
    valid: [],
})
