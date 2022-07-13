/* eslint-disable sort-keys-fix/sort-keys-fix */

import rule from '../../../rules/class-members-sorting'
import {
    TS_FILE_PATH,
    tsRuleTester,
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
    constructor(myName: string) {
        this.lastName = myName
    }

    public set someone(test: string) {
        this.lastName = test
    }

    public get what() {
        return this.address + "1"
    }

    private address: string

    private static flyAway() {
        return 'im gone'
    }

    // Im a comment
    private whoAmI() {
        return "I dont know"
    }

    public livingPlace: string

    public lastName: string

    public static calculate() {
        return 1 + 1 
    }

    private static phoneNumber: number

    public whoAreYou() {
        return "You is me"
    }

    public static fistName: string
}
`,
            filename: TS_FILE_PATH,
            output: `
export class Person {
private static phoneNumber: number
 public static fistName: string
private static flyAway() {
        return 'im gone'
    }
 public static calculate() {
        return 1 + 1 
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
}
`,
        },
    ],
    valid: [
        {
            filename: TS_FILE_PATH,
            code: `
export class Person {
  private static phoneNumber: number
  public static fistName: string

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
}
`
        }
    ],
})
