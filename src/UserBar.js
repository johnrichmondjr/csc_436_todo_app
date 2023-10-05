import Login from './Login'
import Logout from './Logout'
import Register from './Register'

export default function UserBar({ user, onLogin, onLogout }) {
    if (user) {
        return <Logout user={user} onLogout={onLogout} />;
    } else {
        return (
            <>
                <Login onLogin={onLogin} />
                <Register onLogin={onLogin} />
            </>
        );
    }
}
