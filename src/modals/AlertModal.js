import React from 'react'
import styles from "./AlertModal.module.css"


export default function Alert(props) {

    return (
        <div className={` ${styles.modalBackdrop} close-modal`}>
            <div className={`${styles.modalBox} ${styles.modalContent}`}>
                <h1>{props.message}</h1>
                <button onClick={props.handleButton}>ปิด</button>
            </div>
        </div>
    )
}
