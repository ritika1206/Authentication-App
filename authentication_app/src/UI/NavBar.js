import classes from "./NavBar.module.css";
import { AuthContext } from '../context/auth-context';
import { useContext } from "react";

const NavBar = () => {
    const auth = useContext(AuthContext);

    return (
        <nav className={classes.navBar}>
            <li>
                <h3 className={classes.title}>Auth-App</h3>
            </li>
            <li>
                <button type="button" className={classes.logoutBtn} onClick={auth.logout}>Logout</button>
            </li>
        </nav>
    );
}

export default NavBar;