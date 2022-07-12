import rule from '../../../rules/class-members-sorting'
import {
    TS_FILE_PATH, tsRuleTester,
} from '../utils'

tsRuleTester.run(rule.name, rule.value, {
    invalid: [
        {
            code: `
export class PlaygroundRootStore {
    public playgroundStore: PlaygroundStore

    public liveDataStore: LiveDataStore

    public vehicle: VehicleJSON | null = null

    public vehicleSignals = observable.map<string, VehicleSignal>({})

    public widgetPlaceholder: WidgetJSON | null = null

    public widgetSettings: string | null = null

    public widgets = observable.map<string, WidgetStore>({})

    constructor(value: PlaygroundRootStoreSnapshot) {
        const vehicle = value.vehicle ?? value.playground?.vehicle

        if (vehicle) {
            this.vehicle = {
                id: vehicle.id,
                name: vehicle.variant.model.name,
                vin: vehicle.vin,
            }
        }

        this.playgroundStore = new PlaygroundStore(value?.playground)
        this.liveDataStore = new LiveDataStore(value.playground?.autostream)

        makeAutoObservable(this, undefined, { autoBind: true })
    }

    public get vehicleSignalsList(): VehicleSignal[] {
        return [...this.vehicleSignals.values()]
    }

    public get widgetContent(): WidgetJSON[] {
        return [...this.widgets.values()].map((widget) => {
            return widget.toJSON()
        })
    }

    public get widgetLayouts(): LayoutItem[] {
        return [...this.widgets.values()].map((widget) => {
            return widget.toJSON().layout
        })
    }

    public get widgetSignals(): string[] {
        let signals: string[] = []

        for (const widget of this.widgets.values()) {
            if ('source' in widget.options && widget.options.hasValidSource && widget.options.source) {
                signals = signals.concat(widget.options.source)
            }
        }

        return [...new Set(signals)]
    }

    public get isStreaming(): boolean {
        return this.liveDataStore.isStreaming || (this.liveDataStore.autostream && this.liveDataStore.isConnected)
    }

    public getWidget(widget: WidgetJSON): WidgetStore | null {
        if (widget.type === 'chart') {
            return new ChartWidgetStore(widget, this)
        } else if (widget.type === 'label') {
            return new LabelWidgetStore(widget)
        } else if (widget.type === 'map') {
            return new MapWidgetStore(widget, this)
        } else if (widget.type === 'led') {
            return new LedWidgetStore(widget, this)
        } else if (widget.type === 'linear') {
            return new LinearWidgetStore(widget, this)
        } else if (widget.type === 'radial') {
            return new RadialWidgetStore(widget, this)
        }

        return null
    }

    public addVehicle(vehicle: VehicleJSON): void {
        this.vehicle = vehicle
    }

    public addVehicleSignals(vehicleSignals: VehicleSignal[]): void {
        transaction(() => {
            this.vehicleSignals.clear()

            for (const vehicleSignal of vehicleSignals) {
                this.vehicleSignals.set(vehicleSignal.id, { ...vehicleSignal })
            }
        })
    }

    public addWidgetPlaceholder(widget: WidgetStore): void {
        this.widgetPlaceholder = widget
    }

    public addWidgetSettings(widgetId: string): void {
        this.widgetSettings = widgetId
    }

    public addWidgets(widgets: WidgetJSON[]): void {
        transaction(() => {
            let foundWidget

            for (const widget of widgets) {
                foundWidget = this.getWidget(widget)

                if (foundWidget) {
                    this.widgets.set(widget.id, foundWidget)
                }
            }
        })
    }

    public addWidgetsLayouts(layouts: LayoutItem[]): void {
        transaction(() => {
            let foundWidget

            for (const layout of layouts) {
                foundWidget = this.widgets.get(layout.i)

                if (foundWidget) {
                    foundWidget.layout = layout
                }
            }
        })
    }

    public removeWidget(widgetId: string): void {
        this.widgets.delete(widgetId)
    }

    public removeWidgetPlaceholder(): void {
        this.widgetPlaceholder = null
    }

    public removeWidgetSettings(): void {
        this.widgetSettings = null
    }

    public transferPlaceholder(layout: LayoutItem): void {
        transaction(() => {
            if (!this.widgetPlaceholder) {
                return
            }

            const newId = nanoid()
            const newWidget = this.getWidget({
                ...this.widgetPlaceholder,
                id: newId,
                layout: {
                    ...layout,
                    i: newId,
                },
            })

            if (newWidget) {
                this.widgets.set(newWidget.id, newWidget)
            }

            this.widgetPlaceholder = null
        })
    }

    public duplicateWidget(): void {
        transaction(() => {
            if (!this.widgetSettings) {
                return
            }

            const currentWidget = this.widgets.get(this.widgetSettings)

            if (currentWidget) {
                const id = nanoid()
                const newWidget = this.getWidget({
                    id,
                    layout: {
                        ...currentWidget.layout,
                        i: id,
                    },
                    options: currentWidget.options,
                    type: currentWidget.type,
                } as WidgetJSON)

                if (newWidget) {
                    this.widgets.set(newWidget.id, newWidget)

                    window.requestAnimationFrame(() => {
                        this.addWidgetSettings(newWidget.id)
                    })
                }
            }
        })
    }
}
`,
            errors: [],
            filename: TS_FILE_PATH,
        },
    ],
    valid: [],
})
