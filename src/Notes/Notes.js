import React, { useContext } from "react";
import Note from "./Note";
import PostContext from "../shared/PostContext";

export default function ShowNote() {
  const { posts } = useContext(PostContext);
  const reversedPosts = [...posts].reverse();

  return (
    <div className="Show-item">      
      {reversedPosts.map((x) => {
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