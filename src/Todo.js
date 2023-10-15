export default function Todo({ title, description, dateCreated, author, complete, dateCompleted, id, dispatchTodo, onTodoToggle }) {

    function deleteTodo(id) {
        dispatchTodo({
            type: "DELETE_TODO",
            id: id
        })
    }

    function toggleTodo(id) {
        if (!complete) {
            dateCompleted = Date.now()
        } else {
            dateCompleted = null
        }

        complete = !complete
        dispatchTodo({
            type: "TOGGLE_TODO",
            id: id,
            dateCompleted: dateCompleted,
            complete: complete
        })
    }


    return (
        < div >
            <input type="checkbox"
                checked={complete}
                onChange={() =>
                    toggleTodo(id, dateCompleted, complete)
                }
            />
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
