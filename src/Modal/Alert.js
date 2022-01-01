import React from 'react'
import styles from "./Alert.module.css"


export default function Alert(props) {
    
    // function handleButton() {
    //     setModalOn(false);
    // }

    // window.onclick = function(event) {
    //     if (event.target === document.querySelector(".close-modal")) {
    //         setModalOn(false);
    //     }
    // }

    return (
        <div className={` ${styles.modalBackdrop} close-modal`}>
            <div className={`${styles.modalBox} ${styles.modalContent}`}>
                <h1>{props.message}</h1>
                <button onClick={props.handleButton}>ปิด</button>
            </div>
        </div>
    )
}
