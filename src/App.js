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

  const handleTodoToggle = (todoIndex) => {
    const updatedTodos = [...todos];
    const currentTodo = updatedTodos[todoIndex];
    if (currentTodo.complete) {
      currentTodo.dateCompleted = null;
    } else {
      currentTodo.dateCompleted = Date.now();
    }
    currentTodo.complete = !currentTodo.complete;
    dispatch({ type: "TOGGLE_TODO", ...updatedTodos });
  };

  return (
    <div>
      <UserBar user={user} dispatchUser={dispatch} />
      <CreateTodo user={user} onTodoSubmit={handleNewTodo} />
      <TodoList todos={todos} dispatchTodo={dispatch} onTodoToggle={handleTodoToggle} />
    </div>
  );
}

export default App;
