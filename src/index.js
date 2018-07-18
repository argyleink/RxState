import { Subject, BehaviorSubject } from 'rxjs'
import { map, merge, scan } from 'rxjs/operators'

export function rxStore(initial_state, reducers) {
  let stream$ = {}, action$ = {}, $
  
  for (let action in reducers) {
    let subject$            = new Subject()
    stream$[`${action}$`]   = subject$.pipe(map(reducers[action]))
    action$[action]         = args => subject$.next(args)
  }

  $ = new BehaviorSubject(initial_state)
    .pipe(
      merge(...Object.values(stream$)),
      scan((state, reducer) => reducer(state))
    )
  
  return Object.assign({$}, action$)
}

export function rxLogger(prefix, observable) {
  return observable.pipe(scan((prevState, nextState) => {
    console.groupCollapsed(`${prefix}`)

    console.log(`%c prev state:`, `color: #999999; font-weight: bold`, prevState)
    console.log(`%c next state:`, `color: #4CAF50; font-weight: bold`, nextState)

    console.groupEnd()
    return nextState
  })).subscribe()
}