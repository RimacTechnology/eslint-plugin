import rule from '../../../rules/class-members-sorting'
import {
    TS_FILE_PATH, tsRuleTester,
} from '../utils'

tsRuleTester.run(rule.name, rule.value, {
    invalid: [
        {
            errors: [
                {
                    column: 1,
                    line: 2,
                    messageId: 'default',
                },
            ],
            code: `
export class PlaygroundRootStore {
    public static name: string

    public playgroundStore: PlaygroundStore

    constructor(value: PlaygroundRootStoreSnapshot) {
        this.liveDataStore = new LiveDataStore(value.playground?.autostream)
    }

    public get vehicleSignalsList(): VehicleSignal[] {
        return [...this.vehicleSignals.values()]
    }

    public get isStreaming(): boolean {
        return this.liveDataStore.isStreaming || (this.liveDataStore.autostream && this.liveDataStore.isConnected)
    }

    public addVehicle(vehicle: VehicleJSON): void {
        this.vehicle = vehicle
    }

    public addWidgetPlaceholder(widget: WidgetStore): void {
        this.widgetPlaceholder = widget
    }

    public addWidgetSettings(widgetId: string): void {
        this.widgetSettings = widgetId
    }
}
`,
            filename: TS_FILE_PATH,
        },
    ],
    valid: [],
})
