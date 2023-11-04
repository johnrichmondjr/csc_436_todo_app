import React, { useReducer } from 'react';
import CreateTodo from './CreateTodo'
import TodoList from './TodoList';
import UserBar from './UserBar';
import appReducer from './reducers';

import { StateContext } from "./contexts";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: '',
    todos: []
  });

  const { todos } = state

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
