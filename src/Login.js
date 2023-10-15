import React, { useState } from 'react';

export default function Login({ dispatchUser }) {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            dispatchUser({ type: "LOGIN", username: username })
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="login-username">Username:</label>
            <input
                type="text"
                name="login-username"
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="login-password">Password:</label>
            <input type="password" name="login-password" id="login-password" />
            <input type="submit" value="Login" disabled={username.length === 0} />
        </form>
    );
}
