import React from "react";
import Delete from "./Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";

export default function Note(props) {
  const date = new Date(props.date).getDate().toString() + "/" + ( new Date(props.date).getMonth() + 1 ).toString() + "/" + new Date(props.date).getFullYear().toString() || "no date described.";

  return (
    <div className="Item-block">

      <div className="item-block-flex">
        <div className="item-block-flex-heading">
          <h3>{props.item}</h3>
        </div>
        <div className="item-block-flex-body">
          <p className="description-text">{props.des}</p>
        </div>
        <div className="item-block-footer item-block-flex-footer">
          <p className="date-text">{date}</p>
          <div className="footer-buttons">
            <Link to={`/posts/edit/${props.id}`}><EditIcon /></Link>
            <Delete id={props.id} />
          </div>
        </div>
      </div>
    </div>
  );
}