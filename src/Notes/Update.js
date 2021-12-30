import styles from "./Update.module.css";
import React, {useRef, useContext, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostContext from "../share/PostContext";

export default function Update() {
    const { postId } = useParams();
    const { posts, updatePost } = useContext(PostContext);
    const thePost = posts.find(x => x._id.toString() === postId);
    const navigate = useNavigate();
    const titleRef = useRef();
    const desRef = useRef();

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

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    function handleCancel(e) {
        navigate("/posts",{ replace: true });        
    }

    function handleSubmit(e) {
        e.preventDefault();
        const id = postId;
        const title = titleRef.current.value;
        const des = desRef.current.value;
        if (title === thePost.item && des === thePost.des) {
            navigate("/posts", {replace:true});
            return;
        }
        if (title.length === 0){
            alert("โปรดระบุหัวข้อ");
            return;
        }
        if (title.length > 25) {
            alert("หัวข้อยาวเกินไป");
            return;
        }
        if (des.length > 90){
            alert("รายละเอียดยาวเกินไป");
            return;
        }
        updatePost(id,title,des);
        navigate("/posts", {replace:true});

    }

    return (
        <div className={`backdrop-div ${styles.modalBackdrop}`}>
            <div className={styles.modalBox}>
                <form onSubmit={handleSubmit}>
                    <input type="text" ref={titleRef} className={styles.modalInput} />
                    <br/><br/>
                    <textarea onKeyPress={handleKeyPress} type="text" ref={desRef} className={styles.modalTextarea} />
                    <div className={styles.modalButtons}>
                        <button type="button" onClick={handleCancel}>ยกเลิก</button>
                        <button type="submit">อัปเดต</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
