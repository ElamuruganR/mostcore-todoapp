// @flow
/* global HTMLElement, HTMLInputElement, Event, $Call */
import { id } from '@most/prelude'
import { addTodo, updateCompleted, removeTodo, updateAllCompleted, removeAllCompleted, setFilter, updateDescription } from './model'

// type As<B, A = *> = $Call<A, A => B>

// type DOMEvent<E> = { target: E } & Event
// type InputEvent = DOMEvent<HTMLInputElement>
// type ClickEvent = DOMEvent<HTMLElement>
// type HashChangeEvent = { newURL: string } & Event

const ENTER_KEY = 'Enter'
// const ESC_KEY = 'Escape'

// export type Action = App => App

export const runAction = (app, action) =>{
  console.log('Action():',action);
  console.log('Action(App):',app);
  return action(app)
}

export const handleAdd = (e) => {
  const value = e.target.value.trim()
  if (e.key !== ENTER_KEY || value.length === 0) {
    return id
  }
  e.target.value = ''
  return addTodo(value)
}

export const handleUpdate = (identity) => (e) => {
  const value = e.target.value.trim()
  if(e.key === ENTER_KEY && value.length === 0) {
    document.querySelector(`input.edit.id${identity}`).style.display="none";
  }
  if (e.key !== ENTER_KEY || value.length === 0) {
    return id
  }
  e.target.value = ''
  document.querySelector(`input.edit.id${identity}`).style.display="none";
  return updateDescription(value, identity)
}

export const handleToggleAll = (e) =>
  updateAllCompleted(e.target.checked)

export const handleComplete = ({ id }) => (e) =>
  updateCompleted(e.target.checked, id)

export const handleRemove = ({ id }) => (e) =>
  removeTodo(id)

export const handleRemoveAllCompleted = (e) =>
  removeAllCompleted

export const handleFilterChange = (e) =>{
  console.log('url:',e.newURL);
  console.log('replaced: ',e.newURL.replace(/^.*#/, ''));
  return  setFilter(e.newURL.replace(/^.*#/, ''))
}