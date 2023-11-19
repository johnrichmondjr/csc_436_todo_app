import React, { useEffect, useReducer } from 'react';
import { useResource } from 'react-request-hook'

import CreateTodo from './CreateTodo'
import TodoList from './TodoList';
import UserBar from './UserBar';
import appReducer from './reducers';

import { StateContext } from "./contexts";

function App() {

  const [todosResponse, getTodos] = useResource(() => ({
    url: '/todos',
    method: 'get'
  }))

  useEffect(getTodos, [])

  useEffect(() => {
    if (todosResponse && todosResponse.data) {
      dispatch({ type: 'FETCH_TODOS', todos: todosResponse.data.reverse() })
    }
  }, [todosResponse])

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: []
  });

  const { user, todos } = state

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <UserBar />
        <CreateTodo />
        <TodoList todos={todos} />
      </StateContext.Provider>
    </div>
  );
}

export default App;
