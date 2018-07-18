import { rxStore, rxLogger } from './rxstatestore.js'

const $count  = document.getElementById('count')
const $up     = document.querySelector('[data-action="increment"]')
const $down   = document.querySelector('[data-action="decrement"]')

const Counter = rxStore(0, {
  increment: (amount = 1) => count => count + amount
, decrement: (amount = 1) => count => count - amount
})

$up.onclick   = e => Counter.increment()
$down.onclick = e => Counter.decrement()

Counter.$.subscribe(count => $count.textContent = count)

// opt into nice state change logs
rxLogger('Counter', Counter.$)