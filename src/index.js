// @flow
// TODO:
// 1. localStorage
// 2. todo editing
/* global Document, Element */
import { skipRepeats, map, merge, scan, tap, runEffects } from '@most/core'
import { newDefaultScheduler } from '@most/scheduler'
import { hashchange } from '@most/dom-event'
import { createAdapter } from '@most/adapter'

import { emptyApp } from './model'
import { View } from './view.jsx'
import { handleFilterChange, runAction } from './action'
import * as ReactDOM from 'react-dom'


const fail = (s) => { throw new Error(s) }
const qs = (s, el) => el.querySelector(s) || fail(`${s} not found`)
const appNode = qs('.todoapp', document)

//Local Storage
const fromLocalStorage = id => defaultvalue => {
  const item = localStorage.getItem(id);
  return item ? JSON.parse(item) : defaultvalue
}
const toLocalStorage = state => id => {
  console.log('Scanned values: ',id)
  localStorage.setItem(state, JSON.stringify(id));
}

// States
const appState = fromLocalStorage("state")(emptyApp);
const scheduler = newDefaultScheduler();
const [addAction, todoActions] = createAdapter();

// Log
const log = name => value => (tap(()=>console.log(`${name}:`, value), value))

// Process
const updateFilter = map(handleFilterChange, hashchange(window));
const actions = merge(log("TodoActionsNew:")(todoActions), log("Update Filter:")(updateFilter))
const stateUpdates =  skipRepeats(tap(toLocalStorage('state'), scan(runAction, appState, log("Actions:")(actions))))
const viewUpdates = tap(rel => ReactDOM.render(rel, appNode), map(View(addAction), stateUpdates))

// Render
runEffects(viewUpdates, scheduler)