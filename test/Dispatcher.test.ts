import { AbstractDispatchable } from '../src'
import { AbstractHandler } from '../src'
import { dispatcher } from '../src'

class MyDispatchable extends AbstractDispatchable {
    kind = 'MyDispatchable'

    testData = 'test data'
}

class MyHandler extends AbstractHandler {
    public handle(dispatchable: MyDispatchable): string {
        return dispatchable.testData
    }
}

it('calls handle method of a dispatchable when dispatched', () => {
    const dispatchable = new MyDispatchable()
    const handler = MockHandler(new MyHandler(), [
        {
            prop: 'handle', impl: null
        }
    ])

    dispatcher.registerHandler(handler, dispatchable)
    dispatcher.dispatch()

    expect(handler.handle).toHaveBeenCalled()
})