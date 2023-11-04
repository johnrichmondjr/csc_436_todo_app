import { v4 as uuidv4 } from "uuid";

import { useResource } from 'react-request-hook'
import React, { useState, useContext } from 'react';
import { StateContext } from "./contexts";

export default function CreateTodo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { state, dispatch } = useContext(StateContext);
    const { user } = state;

    const [todo, createTodo] = useResource(({ title, description, author, dateCreated, complete, dateCompleted }) => ({
        url: '/todos',
        method: 'post',
        data: { title, description, author, dateCreated, complete, dateCompleted }
    }))


    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim() === '') return;

        const newTodo = {
            title,
            description,
            author: user,
            dateCreated: Date.now(),
            complete: false,
            dateCompleted: null,
            id: uuidv4()
        };

        createTodo(newTodo)
        dispatch({ type: "CREATE_TODO", ...newTodo });

        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>Author: <b>{user}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input
                    type="text"
                    name="create-title"
                    id="create-title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="create-description">Description:</label>
                <textarea
                    name="create-description"
                    id="create-description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <input type="submit" value="Create" />
        </form>
    );
}
