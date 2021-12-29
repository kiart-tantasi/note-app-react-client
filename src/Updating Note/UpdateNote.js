import React, { useContext, useRef, useState } from "react";
import UpdateIcon from "@mui/icons-material/UpdateRounded";
import PostContext from "../share/PostContext";

export default function UpdateNote(props) {
  const [update, setUpdate] = useState({ id: "", des: "" });
  const inputRef = useRef();
  const { updatePost } = useContext(PostContext);
  const posts = [...props.posts];

  function handleSelectChange(e) {
    const id = e.target.value;
    inputRef.current.focus();
    const oldDes = posts.find(x => x._id === id).des;
    setUpdate((prev) => {
      return { ...prev, des: oldDes };
    });
    setUpdate((prev) => {
      return { ...prev, id: id };
    });
  }

  function handleDesChange(e) {
    const des = e.target.value;
    setUpdate((prev) => {
      return { ...prev, des: des };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const id = update.id;
    const des = update.des.trim();
    const oldTitle = posts.find(x => x._id === id).item;
    // There is no new description.
    if (id.length === 0) {
      alert("โปรดเลือกโพสต์ที่ต้องการอัปเดต");
      return;
    }
    // There is no new description.
    if (des.length === 0) {
      alert("โปรดระบุรายละเอียดการอัปเดต");
      return;
    }
    // Description is longer than 90 characters.
    if (des.length > 90) {
      alert("รายละเอียดยาวเกินไป");
      return;
    }
    updatePost(id,oldTitle,des);
    setUpdate((prev) => {
      return { ...prev, des: "" };
    });
  }

  if (posts.length === 0) {
    return (
      <div className="no-posts-update">
        <p>โพสต์อิทกันเลย!</p>
      </div>
    )
  }

  return (
    <div className="Update-item">
      <form>
        <select value={update.id} onChange={handleSelectChange}>

          <option hidden defaultValue>
            เลือกโพสต์
          </option>

          {posts.reverse().map((x) => (
            <option key={x._id} value={x._id}>
              {x.item}
            </option>
          ))}
        </select>

        <input
          className="install-font"
          ref={inputRef}
          onChange={handleDesChange}
          value={update.des}
          type="text"
          name="des"
          placeholder="อัปเดตโพสต์"
          autoComplete="off"
        ></input>

        <button onClick={handleSubmit}>
          <UpdateIcon />
        </button>
      </form>
    </div>
  );
}