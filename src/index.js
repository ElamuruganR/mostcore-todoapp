// @flow
// TODO:
// 1. localStorage
// 2. todo editing
/* global Document, Element */
import { skipRepeats, map, merge, scan, tap, runEffects, ap } from '@most/core'
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


const [addAction, todoActions] = createAdapter();
//Local Storage
const fromLocalStorage = state => defaultvalue => {
  const item = localStorage.getItem(state);
  return item ? JSON.parse(item) : defaultvalue
}
const toLocalStorage = state => value => {
  localStorage.setItem(state, JSON.stringify(value));
  return value;
}

// States
// const appState = emptyApp;
const appState = fromLocalStorage("state")(emptyApp);
const scheduler = newDefaultScheduler();

// Log
const log = name => value => (tap(()=>console.log(`${name}:`, value), value))

// Process
const updateFilter = map(handleFilterChange, hashchange(window));
const actions = merge(todoActions, updateFilter)

// const stateUpdates =  skipRepeats(scan(runAction, appState, actions))
const stateUpdates =  skipRepeats(tap(toLocalStorage('state'), scan(runAction, appState, actions)))
const viewUpdates = tap(rel => ReactDOM.render(rel, appNode), map(View(addAction), stateUpdates))

// Render
runEffects(viewUpdates, scheduler)