import styles from "./Popup.module.css";

import React from 'react';

export default function Popup(props) {
  return <div className={styles["pop-up"]}>
      <p>{props.children}</p>
      <div className={styles["button-container"]}>
          <button className={styles.button} onClick={props.onClick}>ปิด</button>
      </div>
  </div>;
}
