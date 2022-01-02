import React from "react";
import Delete from "./Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import styles from "./Note.module.css";

export default function Note(props) {
  const date = new Date(props.date).getDate().toString() + "/" + ( new Date(props.date).getMonth() + 1 ).toString() + "/" + new Date(props.date).getFullYear().toString() || "no date described.";

  return (
    <div className="Item-block">

      <div className="item-block-flex">
        <div className="item-block-flex-body">
          <h3>{props.item}</h3>
          <p className={`description-text ${(props.item === "") ? styles.noTitle : styles.withTitle}`}>{props.des}</p>
        </div>

        <div className="item-block-footer item-block-flex-footer">
          <div className="footer-date">
            <p className="date-text">{date}</p>
          </div>
          <div className="footer-buttons">
            <Link to={`/posts/edit/${props.id}`}><button><EditIcon className="edit-icon" /></button></Link>
            <Delete id={props.id} />
          </div>
        </div>

      </div>
    </div>
  );
}