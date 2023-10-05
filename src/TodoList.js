import { v4 as uuidv4 } from "uuid";
import Todo from './Todo'

export default function TodoList({ todos = [], onTodoToggle }) {
    return (
        <div>
            {todos.map((todo, i) => (
                <Todo
                    {...todo}
                    key={uuidv4()}
                    onTodoToggle={() => onTodoToggle(i)}
                />
            ))}
        </div>
    );
}
