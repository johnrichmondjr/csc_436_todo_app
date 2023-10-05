export default function Todo({ title, description, dateCreated, author, complete, dateCompleted, onTodoToggle }) {
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
        </div >
    );
}
