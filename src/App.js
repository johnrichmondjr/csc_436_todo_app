import React, { useState, useReducer } from 'react';
import CreateTodo from './CreateTodo'
import TodoList from './TodoList';
import UserBar from './UserBar';

function App() {

  //const [user, setUser] = useState('');

  function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER":
        return action.username;
      case "LOGOUT":
        return "";
      default:
        return state;
    }
  }

  const [user, dispatchUser] = useReducer(userReducer, "");


  const [todos, setTodos] = useState([]);

  // const handleLogin = (username) => {
  //   setUser(username);
  // };

  // const handleLogout = () => {
  //   setUser('');
  // };

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
      <UserBar user={user} dispatchUser={dispatchUser} />
      <CreateTodo user={user} onTodoSubmit={handleNewTodo} />
      <TodoList todos={todos} onTodoToggle={handleTodoToggle} />
    </div>
  );
}

export default App;
