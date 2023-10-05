import React, { useState } from 'react';

export default function CreateTodo({ user, onTodoSubmit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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
        };

        onTodoSubmit(newTodo);

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
