import React, { useEffect, useReducer } from 'react';
import { useResource } from 'react-request-hook'

import CreateTodo from './CreateTodo'
import TodoList from './TodoList';
import UserBar from './UserBar';
import appReducer from './reducers';

import { StateContext } from "./contexts";

function App() {

  const [todos, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: []
  });


  useEffect(() => {
    if (state.user) {
      getTodos();
    }
  }, [state?.user?.access_token]);

  // useEffect(getTodos, [])

  useEffect(() => {
    if (todos && todos.isLoading === false && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data.reverse() });
    }
  }, [todos]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <UserBar />
        <CreateTodo />
        <TodoList />
      </StateContext.Provider>
    </div>
  );
}

export default App;
