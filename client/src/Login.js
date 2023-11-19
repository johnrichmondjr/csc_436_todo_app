import React, { useEffect, useState } from 'react';
import { useResource } from 'react-request-hook'

export default function Login({ dispatchUser }) {
    const [username, setUsername] = useState('');
    const [loginFailed, setLoginFailed] = useState(false)
    const [password, setPassword] = useState('')

    const [user, login] = useResource((username, password) => ({
        url: "/auth/login",
        method: "post",
        data: { username, password },
    }));


    useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
            if (user.error) {
                setLoginFailed(true);
            } else {
                setLoginFailed(false);
                dispatchUser({
                    type: "LOGIN",
                    username: user.data.username,
                    access_token: user.data.access_token,
                });
            }
        }
    }, [user]);


    function handleUsername(evt) { setUsername(evt.target.value) }
    function handlePassword(evt) { setPassword(evt.target.value) }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            login(username, password)
        }
    };

    return (
        <>
            {loginFailed && (
                <span style={{ color: "red" }}>Invalid username or password</span>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="login-username">Username:</label>
                <input
                    type="text"
                    name="login-username"
                    id="login-username"
                    value={username}
                    onChange={handleUsername}
                />
                <label htmlFor="login-password">Password:</label>
                <input
                    type="password"
                    name="login-password"
                    id="login-password"
                    value={password}
                    onChange={handlePassword}
                />
                <input type="submit" value="Login" disabled={username.length === 0} />
            </form>
        </>

    );
}
