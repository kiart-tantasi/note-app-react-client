import React, { useState } from 'react'
import styles from "./Auth.module.css";

export default function Auth() {

    const [ register, setRegister ] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    let loginOrRegister = (register) ? "Register" : "Login";
    function handleToggle() {
        setRegister(!register);
    }
    return (
        <div className={styles.mainAuth}>
            <button onClick={handleToggle}>Switch</button><br/>
            <form>
                <label htmlFor="username">username</label><input type="text" name="username" /><br/>
                <label htmlFor="password">password</label><input type="password" name="password" /><br/>
                <button>{loginOrRegister}</button>
            </form>
        </div>
    )
}
