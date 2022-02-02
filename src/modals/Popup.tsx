import React from "react";
import styles from "./Popup.module.css";

export default function Popup(props:{children:React.ReactNode; onClick:() => void; extraText?:string; onConfirm?:{text:string, fn:() => void}}) {

  return (
    <div className={styles["pop-up"]}>
        <p>{props.children}</p>
        {props.extraText && <p>{props.extraText}</p>}
        <div className={styles["button-container"]}>
            {props.onConfirm && <button className={styles.button} onClick={props.onConfirm.fn}>{props.onConfirm.text}</button>}
            <button className={styles.button} onClick={props.onClick}>ปิด</button>
        </div>
    </div>
  )
}
