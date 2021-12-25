import React, { useContext, useRef, useState } from 'react'
import PostContext from '../share/PostContext';
import styles from "./Auth.module.css";

export default function Auth() {
    const { isLoggedIn, logIn, logOut, fetchData } = useContext(PostContext);
    const usernameRef = useRef("");
    const passwordRef = useRef("");

    const [ register, setRegister ] = useState(false);
    let loginOrRegister = (register) ? "Register" : "Login";
    function handleToggle() {
        setRegister(!register);
    }
    function handleLogIn(e) {
        e.preventDefault();
        if (register) {
            alert("no register now.");
            return;
        }
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        if (!username || !password) {
            alert("username and/or password are blank.")
            return;
        }
        logIn(username,password);
    }

    if (!isLoggedIn) {
        return (
            <div className={styles.mainAuth}>
                <button onClick={handleToggle}>Switch to {(register) ? "log in" : "register"}</button>
                <br/><br/>
                <form>
                    <label htmlFor="username">username</label>
                    <br/>
                    <input type="text" ref={usernameRef} name="username" autoComplete="off" />
                    <br/><br/>
                    <label htmlFor="password">password</label>
                    <br/>
                    <input type="password" ref={passwordRef} name="password" autoComplete="off" />
                    <br/><br/>
                    <button onClick={handleLogIn} type="submit">{loginOrRegister}</button>
                    <br/><br/>
                    <button><a href="http://localhost:4000/auth">LOG IN WITH GOOGLE ACCOUNT</a></button>
                </form>
            </div>
        )
    }
    return (
        <div className={styles.mainAuth}>
            <h1>FOR TESTING</h1>
            <br/>
            <button onClick={logOut}>Log Out</button>
            <br/><br/>
            <button onClick={fetchData}>Fetch data from server</button>
        </div>
    )
}
