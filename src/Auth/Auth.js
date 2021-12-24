import React, { useContext, useState } from 'react'
import PostContext from '../share/PostContext';
import styles from "./Auth.module.css";

export default function Auth() {
    const { isLoggedIn } = useContext(PostContext);
    const [ register, setRegister ] = useState(false);
    let loginOrRegister = (register) ? "Register" : "Login";
    function handleToggle() {
        setRegister(!register);
    }

    if (isLoggedIn) {
        return (
        <div>
            <h1>HELLO USER</h1>
        </div>
        )
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
