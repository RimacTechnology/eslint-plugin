import rule from '../../../rules/class-members-sorting'
import {
    TS_FILE_PATH, tsRuleTester,
} from '../utils'

tsRuleTester.run(rule.name, rule.value, {
    invalid: [
        {
            errors: [
                {
                    messageId: 'default',
                },
            ],
            code: `
export class Person {
    public static calculate() {
    return 1 + 1 
    }

    private static flyAway() {
    return 'im gone'
    }

    private address: string
    public livingPlace: string
    public lastName: string

    constructor(myName: string) {
    this.lastName = myName
    }

    private whoAmI() {
    return "I dont know"
    }

    public whoAreYou() {
    return "You is me"
    }

    public set someone(test: string) {
    this.lastName = test
    }

    public get what() {
    return this.address + "1"
    }

    private static phoneNumber: number
    public static fistName: string
}
`,
            filename: TS_FILE_PATH,
        },
    ],
    valid: [],
})
