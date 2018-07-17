# RxState
Turn any object or array into a reactive store

Use it like this:
```js
import { RxState, RxLogger } from 'rxstatestore'

// init store with seed state
// actions take manipulation params
// reducers are passed state at time of invocation
// the reducer is expected to return new state post manipulation
const Counter = RxState(0, {
  increment: (amount = 1) => count => count + amount,
  decrement: (amount = 1) => count => count - amount,
})

// subscriber(s) always given latest, at subscription and as state changes (hot)
Counter.store$.subscribe(count => someNode.textContent = count)

// optional: opt into nice state change console logs
RxLogger('Counter', Counter.store$)
```

I made this for myself, but maybe you want it to. It's really just a wrapper function to allow easy to define state stores with RxJS. I've found the strategy scales really well and works great for leveraging RxJS in UI development. 
