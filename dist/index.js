(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators')) :
  typeof define === 'function' && define.amd ? define(['exports', 'rxjs', 'rxjs/operators'], factory) :
  (factory((global.RxState = {}),global.rxjs,global.operators));
}(this, (function (exports,rxjs,operators) { 'use strict';

  function RxState(initial_state, reducers) {
    let streams$ = {}, 
        actions$ = {}, 
        store$;
    
    for (let action in reducers) {
      let subject$            = new rxjs.Subject();
      streams$[`${action}$`]   = subject$.pipe(operators.map(reducers[action]));
      actions$[action]         = args => subject$.next(args);
    }

    store$ = new rxjs.BehaviorSubject(initial_state)
      .pipe(
        operators.merge(...Object.values(streams$)),
        operators.scan((state, reducer) => reducer(state))
      );
    
    return {store$, actions$}
  }

  function RxLogger(prefix, observable) {
    return observable.pipe(operators.scan((prevState, nextState) => {
      console.groupCollapsed(`${prefix}:`);

      console.log(`%c prev state:`, `color: #999999; font-weight: bold`, prevState);
      console.log(`%c next state:`, `color: #4CAF50; font-weight: bold`, nextState);

      console.groupEnd();
      return nextState
    })).subscribe()
  }

  exports.RxState = RxState;
  exports.RxLogger = RxLogger;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
