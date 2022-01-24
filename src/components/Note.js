import React from "react";
import Delete from "../components/Delete";
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";
import styles from "./Note.module.css";


export default function Note(props) {
  const date = new Date(props.date).getDate().toString() + "/" + ( new Date(props.date).getMonth() + 1 ).toString() + "/" + new Date(props.date).getFullYear().toString() || "no date described.";
  const pending = props.pending;

  return (
    <div className={styles["Item-block"]}>

      <div className={styles["item-block-flex-container"]}>
        <div className={styles["item-block-flex-body"]}>
          <h3>{props.item}</h3>
          <p className={` ${styles["description-text"]} ${(props.item === "") ? styles.noTitle : styles.withTitle}`}>{props.des}</p>
        </div>

        <div className={` ${styles["item-block-footer"]} ${styles["item-block-flex-footer"]} `}>
          <div className={styles["footer-date"]}>
            <p className={styles["date-text"]}>{date}</p>
          </div>
          <div className={styles["footer-buttons"]}>
            {pending && <CircularProgress size={20} color="inherit" className={styles["spinner-ui"]} />}
            {!pending && <Link to={`/posts/edit/${props.id}`}><button><EditIcon className="edit-icon" /></button></Link>}
            <Delete id={props.id} classProp={styles["spinner-ui"]} />
          </div>
        </div>

      </div>
    </div>
  );
}