import React, { useContext } from "react";
import Note from "./Note";
import PostContext from "../context/PostContext";
import styles from "./Notes.module.css";

export default function ShowNote() {
  const { posts } = useContext(PostContext);
  const reversedPosts = [...posts].reverse();

  return (
    <div className={styles.notes}>      
      {reversedPosts.map((x) => {
        return (
          <Note
            key={x._id}
            id={x._id}
            item={x.item}
            des={x.des}
            date={x.date}
            pending={x.pending}
          />
        );
      })}
    </div>
  );
}