import { useResource } from 'react-request-hook'
import React, { useContext } from 'react';
import { StateContext } from "./contexts";

export default function Todo({ title, description, dateCreated, author, complete, dateCompleted, id }) {
    const { state, dispatch } = useContext(StateContext);

    const [deleted, deleteTodo] = useResource((id) => ({
        url: "/todo/" + id,
        method: "DELETE",
        headers: { Authorization: `${state.user.access_token}` },
        data: { id: id }
    }));

    const [updated, updateTodo] = useResource(
        (title, description, dateCreated, author, complete, dateCompleted, id) => ({
            url: "/todo/" + id,
            method: "PATCH",
            headers: { Authorization: `${state.user.access_token}` },
            data: {
                id: id,
                title: title,
                description: description,
                dateCreated: dateCreated,
                author: author,
                complete: complete,
                dateCompleted: dateCompleted,

            },
        })
    );

    function deleteTodoFromList(id) {
        deleteTodo(id)
        dispatch({
            type: "DELETE_TODO",
            id: id
        })
    }

    function toggleTodo(title, description, dateCreated, author, complete, dateCompleted, id) {
        if (!complete) {
            dateCompleted = Date.now()
        } else {
            dateCompleted = null
        }

        complete = !complete
        updateTodo(title, description, dateCreated, author, complete, dateCompleted, id);
        dispatch({
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
                    toggleTodo(title, description, dateCreated, author, complete, dateCompleted, id)
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
            <button onClick={() => deleteTodoFromList(id)}>Delete ToDo</button>
        </div >
    );
}
