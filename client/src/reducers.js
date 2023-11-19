function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                username: action.username,
                access_token: action.access_token,
            };
        case "LOGOUT":
            return "";
        default:
            return state;
    }
}

function todoReducer(state, action) {
    switch (action.type) {
        case "CREATE_TODO":
            const newTodo = {
                title: action.title,
                description: action.description,
                author: action.author,
                dateCreated: action.dateCreated,
                complete: action.complete,
                dateCompleted: action.dateCompleted,
                id: action.id
            };
            return [newTodo, ...state];
        case "FETCH_TODOS":
            return action.todos
        case "TOGGLE_TODO":
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return {
                        ...todo,
                        dateCompleted: action.dateCompleted,
                        complete: action.complete,
                    };
                }
                return todo;
            });
        case "DELETE_TODO":
            return state.filter((todo) => todo.id !== action.id);
        default:
            return state;
    }
}


export default function appReducer(state, action) {
    return {
        user: userReducer(state.user, action),
        todos: todoReducer(state.todos, action)
    }
}

