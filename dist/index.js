(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators')) :
  typeof define === 'function' && define.amd ? define(['exports', 'rxjs', 'rxjs/operators'], factory) :
  (factory((global.rxstatestore = {}),global.rxjs,global.operators));
}(this, (function (exports,rxjs,operators) { 'use strict';

  function rxStore(initial_state, reducers) {
    let stream$ = {}, action$ = {}, $;
    
    for (let action in reducers) {
      let subject$            = new rxjs.Subject();
      stream$[`${action}$`]   = subject$.pipe(operators.map(reducers[action]));
      action$[action]         = args => subject$.next(args);
    }

    $ = new rxjs.BehaviorSubject(initial_state)
      .pipe(
        operators.merge(...Object.values(stream$)),
        operators.scan((state, reducer) => reducer(state))
      );
    
    return Object.assign({$}, action$)
  }

  function rxLogger(prefix, observable) {
    return observable.pipe(operators.scan((prevState, nextState) => {
      console.groupCollapsed(`${prefix}`);

      console.log(`%c prev state:`, `color: #999999; font-weight: bold`, prevState);
      console.log(`%c next state:`, `color: #4CAF50; font-weight: bold`, nextState);

      console.groupEnd();
      return nextState
    })).subscribe()
  }

  exports.rxStore = rxStore;
  exports.rxLogger = rxLogger;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
