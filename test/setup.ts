import { AbstractHandler } from '../src'

declare global {
    var MockHandler: (handler: AbstractHandler, mockImplementation: any) => any
}

const isDef = (val) => val !== undefined && val !== null

global.MockHandler = (handler: AbstractHandler, props = []) => {
    const tmpHandler = {}

    for (const {prop, impl} of props) {
        tmpHandler[prop] = jest.fn()

        if (isDef(impl)) {
            tmpHandler[prop] = tmpHandler[prop].mockImplementation(impl)
        }
    }

    return tmpHandler
}

beforeEach(async () => {
    jest.clearAllMocks()
})
