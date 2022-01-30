import Note from "./Note";
import styles from "./Notes.module.css";
import { useAppSelector } from "../hooks/useRedux";

export default function Notes() {

  const myPosts = useAppSelector(state => state.post.posts); // can also use it from useContext(PostContext);
  const reversedMyPosts = [...myPosts].reverse();

  return (
    <div className={styles.notes}>      
      {reversedMyPosts.map((x) => {
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