import React from "react";
import Note from "./Note";

export default function ShowNote(props) {
  const posts = [...props.posts];
  return (
    <div className="Show-item">      
      {posts.reverse().map((x) => {
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