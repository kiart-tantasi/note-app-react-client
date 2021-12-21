import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Note(props) {
  function handleDelete() {
    props.deleteItem(props.id);
  }
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
          <button className="delete-button" onClick={handleDelete}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}