import React, { useState } from 'react';
import CreateTodo from './CreateTodo'
import TodoList from './TodoList';
import UserBar from './UserBar';

function App() {

  const [user, setUser] = useState('');

  const [todos, setTodos] = useState([]);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser('');
  };

  const handleNewTodo = (newTodo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
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
    setTodos(updatedTodos);
  };

  return (
    <div>
      <UserBar user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <CreateTodo user={user} onTodoSubmit={handleNewTodo} />
      <TodoList todos={todos} onTodoToggle={handleTodoToggle} />
    </div>
  );
}

export default App;
