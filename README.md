# RxState
Turn any object or array into a reactive store

Use it like this:
```js
import { rxStore, rxLogger } from 'rxstatestore'

// init store with seed state
// actions take manipulation params
// reducers are passed state at time of invocation
// the reducer is expected to return new state post manipulation
const Counter = rxStore(0, {
  increment: (amount = 1) => count => count + amount,
  decrement: (amount = 1) => count => count - amount,
})

// subscriber(s) always given latest, at subscription and as state changes (hot)
Counter.$.subscribe(count => someNode.textContent = count)

// UI logic calls actions
Counter.increment()
Counter.increment(5)
Counter.decrement()
Counter.decrement(5)

// optional: opt into nice state change console logs
rxLogger('Counter', Counter.$)
```

I made this for myself, but maybe you want it to. It's really just a wrapper function to allow easy to define state stores with RxJS. I've found the strategy scales really well and works great for leveraging RxJS in UI development. 
