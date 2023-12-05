import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import './LoginSignupMain.css';

//Component that is in charge of both log in and sign up
function LoginSignUpMain() {
    //Use state for both login and signup forms
    const [signUpForm, setSignUp] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const [logInForm, setLogIn] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();
    //Field listener for sign up
    function signUpFieldListener(event) {
        const { value, name } = event.target;
        setSignUp((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }
    //field listener for login
    function logInFieldListener(event) {
        const { value, name } = event.target;
        setLogIn((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }
    //Function that sends the credentials to our express server and receives a confirmation or an error
    async function logIn(event) {
        event.preventDefault();
        var apiPath = "";
        //Use of apiPath if the webpage is deployed
        if (process.env.NODE_ENV === "production") {

            apiPath = "/api";

        }
        try {
            const response = await axios.post(apiPath + '/login', { user: logInForm });
            if (response.status === 200) {
                localStorage.setItem('usernameSaludDigna', response.data.userDB.username);
                navigate('/forum');
                alert(response.data.message);
            }
        } catch (err) {
            const errorMessage = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : "An unknown error occurred.";
            // Consider using a more user-friendly error handling here
            alert("Error: " + errorMessage);
        }
    }
    //Function that registers the user on mongodb through our express server, if the username or email alredy exists it returns an error
    async function signUp(event) {
        event.preventDefault();
        var apiPath = "";
        //Use of apiPath if the webpage is deployed
        if (process.env.NODE_ENV === "production") {

            apiPath = "/api";

        }
        try {
            const response = await axios.post(apiPath + '/signup', { user: signUpForm });
            if (response.status === 201) {
                localStorage.setItem('usernameSaludDigna', response.data.username);
                navigate('/forum');
            }
        } catch (err) {
            const errorMessage = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : "An unknown error occurred.";
            // Consider using a more user-friendly error handling here
            alert("Error: " + errorMessage);
        }
    }


    return (
        <div className="cont loginSignupMain">
            <div className="form-box">
                {/*Log In container */}
                <div className="login-container" id="login">
                    <div className="top">
                        <span>Don't have an account? <a href="#register">Sign Up</a></span>
                        <header>Login</header>
                    </div>
                    <form method="post" onSubmit={logIn}>
                        <div className="input-box">
                            <input type="text" className="input-field" name="username" placeholder="Username or Email" onChange={logInFieldListener} value={logInForm.username} required />
                            <i className="bx bx-user"></i>
                        </div>
                        <div className="input-box">
                            <input type="password" className="input-field" name="password" placeholder="Password" onChange={logInFieldListener} value={logInForm.password} required />
                            <i className="bx bx-lock-alt"></i>
                        </div>
                        <div className="input-box">
                            <input type="submit" className="submit" value="Sign In" />
                        </div>
                    </form>
                </div>
                {/*Sign Up container */}
                <div className="register-container" id="register">
                    <div className="top">
                        <span>Have an account? <a href="#login">Login</a></span>
                        <header>Sign Up</header>
                    </div>
                    <form method="post" onSubmit={signUp}>
                        <div className="two-forms">
                            <div className="input-box">
                                <input type="text" className="input-field" name="name" placeholder="Name" onChange={signUpFieldListener} value={signUpForm.name} required />
                                <i className="bx bx-user"></i>
                            </div>
                            <div className="input-box">
                                <input type="text" className="input-field" name="username" placeholder="Username" onChange={signUpFieldListener} value={signUpForm.username} required />
                                <i className="bx bx-user"></i>
                            </div>
                        </div>
                        <div className="input-box">
                            <input type="email" className="input-field" name="email" placeholder="Email" onChange={signUpFieldListener} value={signUpForm.email} required />
                            <i className="bx bx-envelope"></i>
                        </div>
                        <div className="input-box">
                            <input type="password" className="input-field" name="password" placeholder="Password" onChange={signUpFieldListener} value={signUpForm.password} required />
                            <i className="bx bx-lock-alt"></i>
                        </div>
                        <div className="input-box">
                            <input type="submit" className="submit" value="Register" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginSignUpMain;