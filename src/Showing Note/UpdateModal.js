import React, { useRef, useContext, useEffect } from 'react'
import styles from "./UpdateModal.module.css";
import PostContext from "../share/PostContext";

export default function UpdateModal(props) {
    const titleRef = useRef();
    const desRef = useRef();
    const { updatePost } = useContext(PostContext);

    useEffect(() => {
        titleRef.current.value = props.item;
        desRef.current.value = props.des;
        desRef.current.focus();
    },[ props.des, props.item ])

    window.onclick = function(event) {
        const backDrop = document.querySelector(".backdrop-div");
        if (event.target === backDrop) {
            props.closeModal();
        }
    }

    window.onpopstate = function() {
        props.closeModal();
    }

    function handleKeyPress(e) {
        // if (e.key === "Enter" && e.shiftKey) {
        //     return;
        // }   
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        props.closeModal(); 
    }

    function handleSubmit(e) {
        e.preventDefault();
        const id = props.id;
        const title = titleRef.current.value;
        const des = desRef.current.value;
        if (title === props.item && des === props.des) {
            props.closeModal(); 
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
        props.closeModal(); 
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