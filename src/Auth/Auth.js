import React, { useContext, useEffect, useRef, useState } from 'react'
import PostContext from '../share/PostContext';
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom"

export default function Auth() {
    const { isLoggedIn, logIn, logOut, userName } = useContext(PostContext);
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();
    const [ registering, setRegistering ] = useState(false);
    const [ userNameState, setUserNameState ] = useState("POST IT APP");

    useEffect(() => {
        if (isLoggedIn !== false && userName !== "") {
            setUserNameState(userName);
        }
    },[isLoggedIn, userName])

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
                    usernameRef.current.value = "";
                    passwordRef.current.value = "";
                    alert("ลงทะเบียนสำเร็จ");
                    setRegistering(false);
                } else if (res.status === 403) {
                    alert("username นี้ถูกใช้งานแล้ว");
                } else {
                    alert("การลงทะเบียนล้มเหลว")
                }
            })
        // log in
        } else if (!registering) {
            fetch("/api/login", options)
            .then(res => {
                if (res.ok) {
                    console.log("logged in successfully");
                    logIn();
                    navigate("/posts",{ replace: true });
                } else if (res.status === 401) {
                    alert("username หรือ password ไม่ถูกต้อง");
                    throw new Error("username หรือ password ไม่ถูกต้อง");
                } else {
                    alert("การเข้าสู่ระบบล้มเหลว");
                    throw new Error("การเข้าสู่ระบบล้มเหลว");
                }
            })
            .catch((err) => console.log(err.message));
        }
    }

    function handleLogOut() {
        fetch("/api/logout", {credentials:"include", method:"POST"})
        .then(res => {
          if (res.ok) {
            console.log("logged out successfully");
            logOut();
          } else {
              logOut();
              throw new Error("failed logging out.")
          }
        })
        .catch(err => console.log(err.message));
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
                    <button className={styles.submitAuth} onClick={handleLogIn} type="submit">{(registering) ? "ลงทะเบียน" : "เข้าสู่ระบบ"}</button>
                    <br/><br/>
                    {/* <button><a href="/api/auth/google">เข้าสู่ระบบ/สมัครโดย GOOGLE ACCOUNT</a></button> */}
                    {/* when testing on 3000, use below */}
                    <button><a href="http://localhost:4000/api/auth/google">เข้าสู่ระบบ/สมัครโดย GOOGLE (3000)</a></button>
                </form>
            </div>
        )
    }
    return (
        <div className={styles.mainAuth}>
            <h1>{userNameState}</h1>
            <br/>
            <button type="button" onClick={handleLogOut}>Log Out</button>
            <br/><br/>
        </div>
    )
}
