import NavBar from "../UI/NavBar";
import classes from "./Home.module.css";

const Home = (props) => {
    return(
        <div className={classes.home}>
            <NavBar setToken = {props.setToken}/>
            <h1 className={classes.msg}>Welcome To App</h1>
        </div>
    );
}

export default Home;