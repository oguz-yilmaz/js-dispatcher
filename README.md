## js-dispatcher 
Library for handling dispachable events like Commands, Jobs, etc. It can be  
used any form off structure where mediator pattern is required.

### Installation 
``` npm install @o.yilmaz/js-dispatcher```
### Example usage 

```typescript
import { AbstractDispatchable, AbstractHandler, dispatcher } from '@o.yilmaz/js-dispatcher'

class OpenAccountCommand extends AbstractDispatchable {
    kind: string = 'OpenAccountCommand'

    data() {
        return 'Account opened'
    }
}

class CloseAccountCommand extends AbstractDispatchable {
    kind: string = 'CloseAccountCommand'

    data() {
        return 'Account closed'
    }
}

class OpenAccountCommandHandler extends AbstractHandler {
    handle(dispatchable: OpenAccountCommand) {
        console.log('OpenAccountCommandHandler run -> ', dispatchable.data())
    }
}

class CloseAccountCommandHandler extends AbstractHandler {
    handle(dispatchable: CloseAccountCommand) {
        console.log('CloseAccountCommandHandler run -> ', dispatchable.data())
    }
}

dispatcher.registerHandler(new OpenAccountCommandHandler(), new OpenAccountCommand())
dispatcher.registerHandler(new CloseAccountCommandHandler(), new CloseAccountCommand())

// since dispatcher is a singleton object, it can be called anywhere from the application
dispatcher.dispatch()
```  
The output of the above code would be:  

```text
OpenAccountCommandHandler run ->  Account opened
CloseAccountCommandHandler run ->  Account closed
```