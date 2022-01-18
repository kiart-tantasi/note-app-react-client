import React, { useContext, useEffect, useRef, useState } from 'react'
import PostContext from '../context/PostContext';
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import Alert from '../modals/AlertModal';

export default function Auth() {
    const { isLoggedIn, logIn, logOut, userName } = useContext(PostContext);
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();
    const [ registering, setRegistering ] = useState(false);
    const [ userNameState, setUserNameState ] = useState("POST IT APP");
    const [alertMessage,setAlertMessage] = useState("");
    const [alertOn, setAlertOn] = useState(false);

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
            setAlertMessage("โปรดระบุ username และ password");
            setAlertOn(true);
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
                    setAlertMessage("ลงทะเบียนสำเร็จ");
                    setAlertOn(true);
                    setRegistering(false);
                } else if (res.status === 403) {
                    setAlertMessage("username นี้ถูกใช้งานแล้ว");
                    setAlertOn(true);
                } else {
                    setAlertMessage("การลงทะเบียนล้มเหลว");
                    setAlertOn(true);
                    
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
                    setAlertMessage("username หรือ password ไม่ถูกต้อง");
                    setAlertOn(true);
                } else {
                    setAlertMessage("การเข้าสู่ระบบล้มเหลว");
                    setAlertOn(true);
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

    function closeModal() {
        setAlertOn(false);
    }

    window.onclick = function(event) {
        if (event.target === document.querySelector(".close-modal")) {
            closeModal();
        }
    }

    window.onkeydown = (e) => {
        if (alertOn) {
          if (e.key === "Enter" || e.key === "Escape") {
            e.preventDefault();
            closeModal();
          }
        }
    }

    function handleEnterFlow(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            passwordRef.current.focus();
        }
    }

    if (!isLoggedIn) {
        return (
            <>
            {alertOn && <Alert message={alertMessage} handleButton={closeModal} />}
            <div className={styles.mainAuth}>
                <button className={styles.toggleAuth} onClick={handleToggle}>ต้องการ{(registering) ? "เข้าสู่ระบบ" : "สมัครใช้งาน"}</button>
                <br/><br/>
                <form>
                    <label htmlFor="username" className={styles.labelUsernamePassword}>username</label>
                    <br/>
                    <input type="text" ref={usernameRef} name="username" autoComplete="off" onKeyDown={handleEnterFlow} />
                    <br/><br/>
                    <label htmlFor="password" className={styles.labelUsernamePassword}>password</label>
                    <br/>
                    <input type="password" ref={passwordRef} name="password" autoComplete="off" />
                    <br/><br/>
                    <button className={styles.submitAuth} onClick={handleLogIn} type="submit">{(registering) ? "ลงทะเบียน" : "เข้าสู่ระบบ"}</button>
                    <br/><br/>
                    {/* <button className={styles.googleAuth}><a className={styles.googleA} href="/api/auth/google">เข้าสู่ระบบ/สมัครโดย GOOGLE ACCOUNT</a></button> */}
                    {/* when testing on 3000, use below */}
                    <button className={styles.googleAuth}><a className={styles.googleA} href="http://localhost:4000/api/auth/google">เข้าสู่ระบบ/สมัครโดย GOOGLE (3000)</a></button>
                </form>
            </div>
            </>
        )
    }
    return (
        <div className={styles.mainAuth}>
            <h1 className={styles.userName}>{userNameState}</h1>
            <br/>
            <button className={styles.logoutButton} type="button" onClick={handleLogOut}>ออกจากระบบ</button>
            <br/><br/>
        </div>
    )
}
