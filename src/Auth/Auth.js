import React, { useContext, useRef, useState } from 'react'
import PostContext from '../share/PostContext';
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom"

export default function Auth() {
    const { isLoggedIn, logIn, logOut } = useContext(PostContext);
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();

    const [ registering, setRegistering ] = useState(false);
    let loginOrRegister = (registering) ? "ลงทะเบียน" : "เข้าสู่ระบบ";
    function handleToggle() {
        setRegistering(!registering);
    }
    function handleLogIn(e) {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        if (!username || !password) {
            alert("โปรดระบุ username และ password")
            return;
        }
        const options = {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username:username, password:password}),
            credentials: "include"
        }
        // register
        if (registering) {
            fetch("/api/register", options)
            .then(res => {
                if (res.ok) {
                    console.log("registered successfully");
                    logIn();
                } else if (res.status === 403) {
                    alert("username นี้ถูกใช้งานแล้ว");
                } else {
                    alert("การลงทะเบียนล้มเหลว")
                }
            })
            return;
        }
        // log in
        fetch("/api/login", options)
        .then(res => {
            if (res.ok) {
                console.log("logged in successfully");
                logIn();
                navigate("/",{ replace: true });
            } else if (res.status === 401) {
                alert("username หรือ password ไม่ถูกต้อง");
            } else {
                alert("การเข้าสู่ระบบล้มเหลว");
            }
        })
    }

    if (!isLoggedIn) {
        return (
            <div className={styles.mainAuth}>
                <button className={styles.toggleAuth} onClick={handleToggle}>ต้องการ{(registering) ? "เข้าสู่ระบบ" : "สมัครใช้งาน"}</button>
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
                    <button className={styles.submitAuth} onClick={handleLogIn} type="submit">{loginOrRegister}</button>
                    <br/><br/>
                    <button><a href="/api/auth/google">เข้าสู่ระบบ/สมัครโดย GOOGLE ACCOUNT</a></button>
                    {/* use href="http://localhost:4000/api/auth/google" when testing */}
                </form>
            </div>
        )
    }
    return (
        <div className={styles.mainAuth}>
            <h1> POST IT APP </h1>
            <br/>
            <button onClick={logOut}>Log Out</button>
            <br/><br/>
        </div>
    )
}
