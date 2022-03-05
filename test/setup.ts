import { AbstractHandler } from '../src'

declare global {
    var Mock: (mockImplementation: any) => any
}

const isDef = (val: any) => val !== undefined && val !== null

global.Mock = (props = []) => {
    const tmpHandler = {} as any

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
