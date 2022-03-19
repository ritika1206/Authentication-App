import classes from "./Form.module.css";
import Card from "../UI/Card";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useInput from "../hooks/use-input";
import { useHttpClient } from "../hooks/http";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import ErrorModal from "../UI/ErrorModal";
import LoadingSpinner from "../UI/LoadingSpinner";

import axios from 'axios';

const LoginForm = (props) => {
    const History = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const {
        val: enteredEmail,
        hasErr: EmailHasErr,
        valChangeHandler: EmailChangeHandler,
        blurHandler: EmailBlurHandler,
        reset: resetEmail,
        valIsValid: EmailIsValid
    } = useInput(val => val.includes("@"));

    const {
        val: enteredPass,
        hasErr: PassHasErr,
        valChangeHandler: PassChangeHandler,
        blurHandler: PassBlurHandler,
        reset: resetPass,
        valIsValid: PassIsValid
    } = useInput(val => val.trim().length >= 7);
    
    const clearError = () => {
        setError(null);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        EmailBlurHandler();
        PassBlurHandler();
        
        if(!EmailIsValid || !PassIsValid)
            return;
        
        // try {
            const data = {
                email: enteredEmail,
                password: enteredPass
            }

            setIsLoading(true);
            axios.post('http://localhost:5000/api/user/login', data)
                .then(data => {
                    // console.log(data);
                    setIsLoading(false);
                    History.replace("/home");
                })
                .catch(err => {
                    setIsLoading(false);
                    console.log(err.response.data.message);
                    // error = err.response;
                    // setError(err.response.data.message);
                    alert(err.response.data.message)
                })

            // const responseData = await sendRequest(
            //   'http://localhost:5000/api/user/login',
            //   'POST',
            //   JSON.stringify({
            //     email: enteredEmail,
            //     password: enteredPass
            //   }),
            //   {
            //     'Content-Type': 'application/json'
            //   }
            // );
            


            // auth.login(responseData.userId, responseData.token);
        //   } catch (err) {}

        // resetPass();
        // resetEmail();
    }

    const mailErrCls = EmailHasErr? classes.inErr : ""
    const pErrCls = PassHasErr? classes.inErr : ""


    return(
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <Card>
                <form className={classes.loginForm} onSubmit={submitHandler}>
                    <label htmlFor="email">E-Mail</label>
                    <input 
                        className={mailErrCls}
                        type="email"
                        onChange={EmailChangeHandler}
                        id="email"
                        onBlur={EmailBlurHandler}
                        value={enteredEmail}
                        />
                    {EmailHasErr && <p className={classes.errMsg}>Please enter a valid Email</p>}
                    <label htmlFor="pass">Password</label>
                    <input 
                        className={pErrCls} 
                        type="password" 
                        onChange={PassChangeHandler} 
                        id="pass"
                        onBlur={PassBlurHandler}
                        value={enteredPass}
                        />
                    {PassHasErr && <p className={classes.errMsg}>Password should have atleast 7 characters</p>}
                    <button type="submit">Login</button>
                </form>
                <Link to="/signup" className={classes.link}>Signup if not registered</Link>
            </Card>
        </>
    );
}

export default LoginForm;