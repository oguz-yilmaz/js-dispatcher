import { AbstractDispatchable } from '../dispatchable/AbstractDispatchable'

export abstract class AbstractHandler {
    abstract handle (dispatchable: AbstractDispatchable): any
}