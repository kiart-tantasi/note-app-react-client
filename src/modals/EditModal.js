import styles from "./EditModal.module.css";
import React, {useRef, useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostContext from "../context/PostContext";
import useRequest from "../hooks/useRequest";

export default function Update() {
    const { postId } = useParams();
    const { isLoggedIn, posts, editPost, turnPendingOn } = useContext(PostContext);
    const thePost = posts.find(x => x._id.toString() === postId);
    const { editPost: editPostRequest } = useRequest();
    const navigate = useNavigate();
    const titleRef = useRef();
    const desRef = useRef();
    const [ borderStyle, setBorderStyle ] = useState({"border":"1px solid rgba(0,0,0,0.5)"});
    const [ desBorderStyle, setDesBorderStyle ] = useState({"border":"1px solid rgba(0,0,0,0.5)"});

    useEffect(() => {
        if (thePost) {
            titleRef.current.value = thePost.item || "";
            desRef.current.value = thePost.des || "";
            desRef.current.focus();
        } else {
            console.log("loading data for editing...")
        }
    }, [thePost])

    function handleTitleKeyDown(e) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            desRef.current.focus();
        }
    }
    function handleDesKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    function handleCancel() {
        navigate("/posts",{ replace: true });        
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        const id = postId;
        const item = titleRef.current.value.trim();
        const des = desRef.current.value.trim();

        // functions to red the input and textarea
        function setTitleRed() {
            setBorderStyle({"border":"1px solid red"});
            setTimeout(() => {
                setBorderStyle({"border":"1px solid rgba(0,0,0,0.5)"});
            }, 3000);
        }
        function setDesRed() {
            setDesBorderStyle({"border":"1px solid red"});
            setTimeout(() => {
                setDesBorderStyle({"border":"1px solid rgba(0,0,0,0.5)"});
            }, 3000);
        }

        if (item === thePost.item && des === thePost.des) { // no changes
            console.log("no changes found.");
            navigate("/posts");
            return;
        }
        if (item.length === 0 && des.length === 0) { // empty values
            setTitleRed();
            setDesRed();
            return;
        }
        if (item.length > 25 && des.length > 95) { // tile > 25 and des > 95
            setTitleRed();
            setDesRed();
            return;
        }
        if (item.length > 25) { // title > 25
            setTitleRed();
            return;
        }
        if (des.length > 95 && item.length !== 0) { // with title
            setDesRed();
            return;
        }
        if (des.length > 120 && item.length === 0) { // without title
            setDesRed();
            return;
        }

        // SUCCESS
        //online updating      
        if (isLoggedIn) {
            turnPendingOn(id);
            async function requestToEdit() {
                try {
                    await editPostRequest({item:item,des:des,id:id});
                    editPost(id,item,des);
                } catch(err) {
                    console.log(err);
                }
            }
            requestToEdit();
        //offline updating
        } else {
            const newPosts = posts.map((x) => (x._id.toString() === id.toString() ? { ...x, item: item, des: des } : x));
            localStorage.setItem("myPostIt", JSON.stringify(newPosts));
            editPost(id,item,des);
        }
        navigate("/posts", {replace:true});
    }

    return (
        <div>
            <div onClick={handleCancel} className={`backdrop-div ${styles.modalBackdrop}`}></div>
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
