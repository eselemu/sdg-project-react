import React from "react";

import './LoginSignupMain.css';

function LoginSignUpMain() {
    return (
        <div className="cont loginSignupMain">
            <div className="form-box">
                <div className="login-container" id="login">
                    <div className="top">
                        <span>Don't have an account? <a href="#register">Sign Up</a></span>
                        <header>Login</header>
                    </div>
                    <form method="post" action="/login">
                        <div className="input-box">
                            <input type="text" className="input-field" name="username" placeholder="Username or Email" />
                            <i className="bx bx-user"></i>
                        </div>
                        <div className="input-box">
                            <input type="password" className="input-field" name="password" placeholder="Password" />
                            <i className="bx bx-lock-alt"></i>
                        </div>
                        <div className="input-box">
                            <input type="submit" className="submit" value="Sign In" />
                        </div>
                    </form>
                </div>
                <div className="register-container" id="register">
                    <div className="top">
                        <span>Have an account? <a href="#login">Login</a></span>
                        <header>Sign Up</header>
                    </div>
                    <form method="post" action="/signup">
                        <div className="two-forms">
                            <div className="input-box">
                                <input type="text" className="input-field" name="name" placeholder="Name" />
                                <i className="bx bx-user"></i>
                            </div>
                            <div className="input-box">
                                <input type="text" className="input-field" name="username" placeholder="Username" />
                                <i className="bx bx-user"></i>
                            </div>
                        </div>
                        <div className="input-box">
                            <input type="text" className="input-field" name="email" placeholder="Email" />
                            <i className="bx bx-envelope"></i>
                        </div>
                        <div className="input-box">
                            <input type="password" className="input-field" name="password" placeholder="Password" />
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