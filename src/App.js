import React, { useReducer } from 'react';
import CreateTodo from './CreateTodo'
import TodoList from './TodoList';
import UserBar from './UserBar';
import appReducer from './reducers';

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: '',
    todos: []
  });

  const { user, todos } = state


  const handleNewTodo = (newTodo) => {
    dispatch({ type: "CREATE_TODO", ...newTodo })
  };

  return (
    <div>
      <UserBar user={user} dispatchUser={dispatch} />
      <CreateTodo user={user} onTodoSubmit={handleNewTodo} />
      <TodoList todos={todos} dispatchTodo={dispatch} />
    </div>
  );
}

export default App;
