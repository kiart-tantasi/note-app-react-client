import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Note(props) {
  const localDate = new Date(props.date).toLocaleString("en");
  function handleButton() {
    props.deleteItem(props.item);
  }
  return (
    <div className="Item-block">
      <div className="item-block-flex">
        <div className="item-block-flex-heading">
          <h3>{props.item}</h3>
        </div>
        <div className="item-block-flex-body">
          <p className="description-text">{props.des}</p>
        </div>
        <div className="item-block-flex-footer">
          <p className="date-text">{localDate}</p>
          <button className="delete-button" onClick={handleButton}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
