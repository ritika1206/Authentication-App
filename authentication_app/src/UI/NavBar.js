import classes from "./NavBar.module.css";
import { useHistory } from "react-router-dom";

const NavBar = (props) => {
    const History = useHistory();
    const logout = () => {
        localStorage.removeItem("token");
        props.setToken(null);
        History.replace("/login")
    }

    return (
        <nav className={classes.navBar}>
            <li>
                <h3 className={classes.title}>Auth-App</h3>
            </li>
            <li>
                <button type="button" className={classes.logoutBtn} onClick={logout}>Logout</button>
            </li>
        </nav>
    );
}

export default NavBar;