export default function Todo({ title, description, dateCreated, author, complete, dateCompleted, id, dispatchTodo, onTodoToggle }) {

    function deleteTodo(id) {
        dispatchTodo({
            type: "DELETE_TODO",
            id: id
        })
    }

    return (
        < div >
            <input type="checkbox" checked={complete} onChange={onTodoToggle} />
            <h3>{title}</h3>
            <div>{description}</div>
            <div>Created: {new Date(dateCreated).toLocaleString()}</div>
            <div>Complete: {complete ? "true" : "false"}</div>
            <div></div>
            <div>Date Completed: {complete && new Date(dateCompleted).toLocaleString()}</div>
            <br />
            <i>Written by <b>{author}</b></i>
            <br />
            <button onClick={() => deleteTodo(id)}>Delete ToDo</button>
        </div >
    );
}
