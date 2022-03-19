import NavBar from "../UI/NavBar";
import classes from "./Home.module.css";

const Home = () => {
    return(
        <div className={classes.home}>
            <NavBar />
            <h1 className={classes.msg}>Welcome To App</h1>
        </div>
    );
}

export default Home;