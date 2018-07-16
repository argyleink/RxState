import { Subject, BehaviorSubject } from 'rxjs'
import { map, merge, scan } from 'rxjs/operators'

export function RxState(initial_state, reducers) {
  let streams$ = {}, 
      actions$ = {}, 
      store$
  
  for (let action in reducers) {
    let subject$            = new Subject()
    streams$[`${action}$`]   = subject$.pipe(map(reducers[action]))
    actions$[action]         = args => subject$.next(args)
  }

  store$ = new BehaviorSubject(initial_state)
    .pipe(
      merge(...Object.values(streams$)),
      scan((state, reducer) => reducer(state))
    )
  
  return {store$, actions$}
}

export function RxLogger(prefix, observable) {
  return observable.pipe(scan((prevState, nextState) => {
    console.groupCollapsed(`${prefix}:`)

    console.log(`%c prev state:`, `color: #999999; font-weight: bold`, prevState)
    console.log(`%c next state:`, `color: #4CAF50; font-weight: bold`, nextState)

    console.groupEnd()
    return nextState
  })).subscribe()
}