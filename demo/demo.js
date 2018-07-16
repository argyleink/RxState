import { RxState, RxLogger } from './rxstate.js'

const $count  = document.getElementById('count')
const $up     = document.querySelector('[data-action="increment"]')
const $down   = document.querySelector('[data-action="decrement"]')

const Counter = RxState(0, {
  increment: (amount = 1) => count => count + amount
, decrement: (amount = 1) => count => count - amount
})

$up.onclick   = e => Counter.actions$.increment()
$down.onclick = e => Counter.actions$.decrement()

Counter.store$.subscribe(count => $count.textContent = count)

// opt into nice state change logs
RxLogger('Counter', Counter.store$)