import Card from "../UI/Card";
import classes from "./Form.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useInput from "../hooks/use-input";
import { useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

import axios from 'axios';

const SignupForm = () => {
    const History = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    // const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const {
        val: enteredEmail,
        hasErr: EmailHasErr,
        valChangeHandler: EmailChangeHandler,
        blurHandler: EmailBlurHandler,
        valIsValid: EmailIsValid
    } = useInput(val => val.includes("@"));

    const {
        val: enteredUname,
        hasErr: UnameHasErr,
        valChangeHandler: UnameChangeHandler,
        blurHandler: UnameBlurHandler,
        valIsValid: UnameIsValid
    } = useInput(val => val.trim() !== "");

    const {
        val: enteredPass,
        hasErr: PassHasErr,
        valChangeHandler: PassChangeHandler,
        blurHandler: PassBlurHandler,
        valIsValid: PassIsValid
    } = useInput(val => val.trim().length >= 7);

    const submitHandler = (event) => {
        event.preventDefault();

        EmailBlurHandler();
        PassBlurHandler();
        UnameBlurHandler();
        
        if(!EmailIsValid || !PassIsValid || !UnameIsValid)
            return;
        
            let userInfo = {
                email: enteredEmail,
                uname: enteredUname,
                password: enteredPass
            };

            const data = userInfo
            
            setIsLoading(true); 
            axios.post('http://localhost:5000/api/user/signup', data)
                .then(data => {
                    setIsLoading(false);
                    console.log(data);
                    alert("Signup Successful, kindly login");
                    History.replace("/login");
                }) 
                .catch(err => {
                    setIsLoading(false);
                    alert(err.response.data.message);
                })   

    }
    
    const mailErrCls = EmailHasErr? classes.inErr : "";
    const pErrCls = PassHasErr? classes.inErr : "";
    const unErrCls = UnameHasErr? classes.inErr : "";

    return(
        <>
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

                    <label htmlFor="uname">Username</label>
                    <input
                        className={unErrCls} 
                        type="text"
                        onChange={UnameChangeHandler}
                        id="uname"
                        onBlur={UnameBlurHandler}
                        value={enteredUname}
                        />
                    {UnameHasErr && <p className={classes.errMsg}>Username can't be empty</p>}

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

                    <button type="submit">Sign Up</button>
                </form>
                <div className={classes.linkTo}>
                    <Link to="/login" className={classes.link}>Login with an existing account</Link>
                </div>
            </Card>
        </>
    );
}

export default SignupForm;