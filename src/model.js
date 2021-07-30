// @flow
// export type Id = number

// export type Todo = {
//   description: string,
//   completed: boolean,
//   id: Id
// }

export const newTodo = (description, id) =>
  ({ description, completed: false, id })

// export type Filter = '/' | '/active' | '/completed'

// export type App = {
//   todos: Todo[],
//   focus: ?Id,
//   filter: Filter,
//   nextId: Id
// }

export const emptyApp =
  { todos: [], focus: null, filter: '/', nextId: 0 }

export const completedCount = ({ todos }) =>
  todos.reduce(countIfCompleted, 0)

const countIfCompleted = (count, { completed }) =>
  count + (completed ? 1 : 0)

export const addTodo = (description) => (app) =>
  ({
    ...app,
    nextId: app.nextId + 1,
    todos: app.todos.concat([newTodo(description, app.nextId)])
  })

export const removeTodo = (id) => (app) =>
  ({
    ...app,
    todos: app.todos.filter(todo => todo.id !== id)
  })

export const updateCompleted = (completed, id) => (app) =>
  ({
    ...app,
    todos: app.todos.map(todo => todo.id === id ? { ...todo, completed } : todo)
  })

export const updateAllCompleted = (completed) => (app) =>
  ({
    ...app,
    todos: app.todos.map(todo => ({ ...todo, completed }))
  })

export const removeAllCompleted = (app) =>
  ({
    ...app,
    todos: app.todos.filter(todo => !todo.completed)
  })

export const setFilter = (filter) => (app) =>
  ({
    ...app,
    filter
  })

export const setFocus = (focus) => (app) =>
  ({
    ...app,
    focus
  })

export const updateDescription = (description, id) => (app) =>
  ({
    ...app,
    todos: app.todos.map(todo => todo.id === id ? { ...todo, description } : todo)
  })
