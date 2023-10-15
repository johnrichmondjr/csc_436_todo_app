import React, { useReducer } from 'react';
import CreateTodo from './CreateTodo'
import TodoList from './TodoList';
import UserBar from './UserBar';

function App() {

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

  function todoReducer(state, action) {
    switch (action.type) {
      case "CREATE_TODO":
        const newTodo = {
          title: action.title,
          description: action.description,
          author: action.author,
          dateCreated: action.dateCreated,
          complete: action.complete,
          dateCompleted: action.dateCompleted
        };
        return [newTodo, ...state];
      default:
        return state;
    }
  }

  const [todos, dispatchTodos] = useReducer(todoReducer, [])

  const handleNewTodo = (newTodo) => {
    //setTodos(prevTodos => [...prevTodos, newTodo]);
    dispatchTodos({ type: "CREATE_TODO", ...newTodo })
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
    dispatchTodos({ type: "TOGGLE_TODO", ...updatedTodos });
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
