import React from 'react';
import ReactDOM from "react-dom";
import styles from "./AlertModal.module.css";


const ModalOverlay =(props) => {
    return (
        <div>
            <div className={` ${styles.modalBackdrop} close-modal`}></div>
            <div className={`${styles.modalBox} ${styles.modalContent}`}>
                <h1>{props.message}</h1>
                <button onClick={props.handleButton}>ปิด</button>
            </div>
        </div>
    )
}

export default function Alert(props) {

    return (
        <>
        {ReactDOM.createPortal(<ModalOverlay message={props.message} handleButton={props.handleButton} />,document.querySelector("#modals"))}
        </>
    )
}
