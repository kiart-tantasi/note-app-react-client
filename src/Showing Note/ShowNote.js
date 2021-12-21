import React from "react";
import Note from "./Note";

export default function ShowNote(props) {
  return (
    <div className="Show-item">      
      {props.data.map((x) => {
        return (
          <Note
            key={x._id}
            id={x._id}
            item={x.item}
            des={x.des}
            date={x.date}
            deleteItem={props.deleteItem}
          />
        );
      })}
    </div>
  );
}