import { useContext } from "react";
import { StateContext } from "./contexts";

export default function Logout() {
    const { state, dispatch: dispatchUser } = useContext(StateContext);
    const { user } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatchUser({ type: "LOGOUT" })
    };

    return (
        <form onSubmit={handleSubmit}>
            Logged in as: <b>{user.username}</b>
            <input type="submit" value="Logout" />
        </form>
    )
}    
