import React from 'react';
import ReactDOM from "react-dom";
import styles from "./AlertModal.module.css";


const ModalOverlay =(props) => {
    return (
        <div>
            <div onClick={props.onClose} className={` ${styles.modalBackdrop} close-modal`}></div>
            <div className={`${styles.modalBox} ${styles.modalContent}`}>
                <h1>{props.message}</h1>
                <button onClick={props.onClose}>ปิด</button>
            </div>
        </div>
    )
}

export default function Alert(props) {

    return (
        <>
        {ReactDOM.createPortal(<ModalOverlay message={props.message} onClose={props.onClose} />,document.querySelector("#modals"))}
        </>
    )
}
