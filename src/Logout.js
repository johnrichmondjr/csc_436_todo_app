export default function Logout({ user, onLogout }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogout("")
    };

    return (
        <form onSubmit={handleSubmit}>
            Logged in as: <b>{user}</b>
            <input type="submit" value="Logout" />
        </form>
    )
}    
