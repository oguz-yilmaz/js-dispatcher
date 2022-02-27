import { AbstractDispatchable } from '../dispatchable/AbstractDispatchable'
import { AbstractHandler } from '../handler/AbstractHandler'

interface HandlerDispatchableType {
    handler: AbstractHandler,
    dispatchable: AbstractDispatchable
}

interface DispatchablesKeyType {
    [key: string]: HandlerDispatchableType
}

class Dispatcher {
    readonly dispatchables: DispatchablesKeyType = {}

    registerHandler (
        handler: AbstractHandler,
        dispatchable: AbstractDispatchable,
    ) {
        this.dispatchables[dispatchable.kind] = { handler, dispatchable }
    }
    
    afterEach () {}

    beforeEach () {}

    dispatch (kind?: string) {
        if (kind) {
            if (!(kind in this.dispatchables)) {
                throw new Error('Undefined dispatchable key!')
            }

            const {handler, dispatchable} = this.dispatchables[kind]

            return handler.handle(dispatchable)
        }

        this.dispatchAll()
    }

    dispatchAll () {
        for (const [kind, {handler, dispatchable}] of Object.entries(this.dispatchables)) {
            this.beforeEach()

            handler.handle(dispatchable)

            this.afterEach()
        }
    }
}

export const dispatcher = new Dispatcher()