import { AbstractDispatchable } from '../src'
import { dispatcher } from '../src'

class MyDispatchable extends AbstractDispatchable {
    kind = 'MyDispatchable'

    testData = 'test data'
}

class MyDispatchable2 extends AbstractDispatchable {
    kind = 'MyDispatchable2'

    testData = 'test data 2'
}

it('calls handle method of a dispatchable when dispatched', () => {
    const dispatchable = new MyDispatchable()
    const handler = Mock([{
            prop: 'handle', impl: null
    }])

    expect(handler.handle).not.toHaveBeenCalled()

    dispatcher.registerHandler(handler, dispatchable)
    dispatcher.dispatch()

    expect(handler.handle).toHaveBeenCalled()
})

it('when handled, gets correct dispatchable data', () => {
    const dispatchable = new MyDispatchable()
    const handler = Mock([{
        prop: 'handle', impl: (dispatchable: MyDispatchable) => {
            return dispatchable.testData
        }
    }])

    expect(handler.handle).not.toHaveBeenCalled()

    dispatcher.registerHandler(handler, dispatchable)
    dispatcher.dispatch()

    expect(handler.handle.mock.results[0].value).toBe('test data')
})

it('calls all handlers when multiple handler assigned', () => {
    const dispatchable1 = new MyDispatchable()
    const dispatchable2 = new MyDispatchable2()

    const handler1 = Mock([{
        prop: 'handle', impl: null
    }])

    const handler2 = Mock([{
        prop: 'handle', impl: null
    }])


    expect(handler1.handle).not.toHaveBeenCalled()
    expect(handler2.handle).not.toHaveBeenCalled()

    dispatcher.registerHandler(handler1, dispatchable1)
    dispatcher.registerHandler(handler2, dispatchable2)
    dispatcher.dispatch()

    expect(handler1.handle).toHaveBeenCalled()
    expect(handler2.handle).toHaveBeenCalled()
})