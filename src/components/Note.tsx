import React from "react";
import { Link } from "react-router-dom";
import Delete from "../components/Delete";
import EditIcon from '@mui/icons-material/Edit';
import styles from "./Note.module.css";

const Note: React.FC<{ date:number; item: string; des: string; id: string; }> = (props) => {
    const date = new Date(props.date).getDate().toString() + "/" + ( new Date(props.date).getMonth() + 1 ).toString() + "/" + new Date(props.date).getFullYear().toString() || "no date described.";
  
    console.log("A Note is rendered.");

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
              {/* {pending && <CircularProgress size={20} color="inherit" className={styles["spinner-ui"]} />} */}
              <button><Link className={styles["edit-link"]} to={`/posts/edit/${props.id}`}><EditIcon className="edit-icon" /></Link></button>
              <Delete id={props.id} classProp={styles["spinner-ui"]} />
            </div>
          </div>
  
        </div>
      </div>
    );
  }

  export default React.memo(Note);