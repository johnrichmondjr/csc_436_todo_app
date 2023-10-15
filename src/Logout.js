export default function Logout({ user, dispatchUser }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatchUser({ type: "LOGOUT" })
    };

    return (
        <form onSubmit={handleSubmit}>
            Logged in as: <b>{user}</b>
            <input type="submit" value="Logout" />
        </form>
    )
}    
