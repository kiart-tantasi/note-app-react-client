import styles from "./Update.module.css";
import React, {useRef, useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostContext from "../shared/PostContext";
import { Logout } from "@mui/icons-material";

export default function Update() {
    const { postId } = useParams();
    const { isLoggedIn, logOut, posts, updatePost } = useContext(PostContext);
    const thePost = posts.find(x => x._id.toString() === postId);
    const navigate = useNavigate();
    const titleRef = useRef();
    const desRef = useRef();
    const [ borderStyle, setBorderStyle ] = useState({"border":"1px solid rgba(0,0,0,0.5)"});
    const [ desBorderStyle, setDesBorderStyle ] = useState({"border":"1px solid rgba(0,0,0,0.5)"});

    useEffect(() => {
        if (posts.length > 0) {
            titleRef.current.value = thePost.item;
            desRef.current.value = thePost.des;
            desRef.current.focus();
        }
    },[posts, thePost])

    window.onclick = function(event) {
        if (event.target === document.querySelector(".backdrop-div")) {
            navigate("/posts",{ replace: true });
        }
    }

    function handleTitleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            desRef.current.focus();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            desRef.current.focus();
        }
    }

    function handleDesKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            titleRef.current.focus();
        }
    }

    function handleCancel(e) {
        navigate("/posts",{ replace: true });        
    }

    function handleSubmit(e) {
        e.preventDefault();
        const id = postId;
        const item = titleRef.current.value.trim();
        const des = desRef.current.value.trim();
        if (item === thePost.item && des === thePost.des) {
            navigate("/posts", {replace:true});
            return;
        }
        if (item.length > 25) {
            setBorderStyle({"border":"1px solid red"});
            setTimeout(() => {
                setBorderStyle({"border":"1px solid rgba(0,0,0,0.5)"});
            }, 3000);
            return;
        }
        if (item.length !== 0 && des.length > 95) {
            setDesBorderStyle({"border":"1px solid red"});
            setTimeout(() => {
                setDesBorderStyle({"border":"1px solid rgba(0,0,0,0.5)"});
            }, 3000);
            return;
        } else if (item.length === 0 && des.length > 120) {
            setDesBorderStyle({"border":"1px solid red"});
            setTimeout(() => {
                setDesBorderStyle({"border":"1px solid rgba(0,0,0,0.5)"});
            }, 3000);
            return;
        }

        // SUCCESS
        //online updating      
        if (isLoggedIn) {
            const options = {
            method:"PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({item:item,des:des}),
            credentials: "include"
            }
            fetch("/api/posts/"+id, options)
            .then(res => {
                if(res.ok) {
                    //online updating
                    updatePost(id,item,des);
                } else if (res.status === 400) {
                    throw new Error("No information sent")
                } else if (res.status === 403) {
                    logOut();
                    throw new Error("No authentication")
                } else {
                    Logout();
                    throw new Error("updating failed.")
                }
            })
            .catch(err => console.log(err.message));
        //offline updating
        } else {
            
            const newPosts = posts.map((x) => (x._id.toString() === id.toString() ? { ...x, item: item, des: des } : x));
            localStorage.setItem("myPostIt", JSON.stringify(newPosts));
            updatePost(id,item,des);
        }
        navigate("/posts", {replace:true});
    }

    return (
        <div className={`backdrop-div ${styles.modalBackdrop}`}>
            <div className={styles.modalBox}>
                <form onSubmit={handleSubmit}>
                    <input type="text" ref={titleRef} className={styles.modalInput} style={borderStyle} onKeyDown={handleTitleKeyDown} />
                    <br/><br/>
                    <textarea onKeyDown={handleDesKeyDown} type="text" ref={desRef} className={styles.modalTextarea} style={desBorderStyle} />
                    <div className={styles.modalButtons}>
                        <button type="button" onClick={handleCancel}>ยกเลิก</button>
                        <button type="submit">อัปเดต</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
