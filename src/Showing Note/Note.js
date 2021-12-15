import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Note(props) {
  function handleButton() {
    props.deleteItem(props.item);
  }
  return (
    <div className="Item-block">
      <h3>{props.item}</h3>
      <p>{props.des}</p>
      <button
        className="delete-button"
        onClick={handleButton}
      >
        <DeleteIcon className="" />
      </button>
    </div>
  );
}
