import { v4 as uuidv4 } from "uuid";
import Todo from './Todo'

export default function TodoList({ todos = [], dispatchTodo, onTodoToggle }) {
    return (
        <div>
            {todos.map((todo, i) => (
                <Todo
                    {...todo}
                    key={uuidv4()}
                    dispatchTodo={dispatchTodo}
                    onTodoToggle={() => onTodoToggle(i)}
                />
            ))}
        </div>
    );
}
