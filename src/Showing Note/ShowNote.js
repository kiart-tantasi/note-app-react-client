import React from "react";
import Note from "./Note";

export default function ShowNote(props) {
  return (
    <div className="Show-item">      
      {props.posts.map((x) => {
        return (
          <Note
            key={x._id}
            id={x._id}
            item={x.item}
            des={x.des}
            date={x.date}
          />
        );
      })}
    </div>
  );
}