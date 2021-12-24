import React, { useContext, useRef, useState } from "react";
import UpdateIcon from "@mui/icons-material/UpdateRounded";
import PostContext from "../share/PostContext";

export default function UpdateNote(props) {
  const [update, setUpdate] = useState({ id: "", des: "" });
  const inputRef = useRef();
  const { updatePost } = useContext(PostContext);

  function handleSelectChange(e) {
    const value = e.target.value;
    inputRef.current.focus();
    setUpdate((prev) => {
      return { ...prev, id: value };
    });
  }

  function handleDesChange(e) {
    const value = e.target.value;
    setUpdate((prev) => {
      return { ...prev, des: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const id = update.id.trim();
    const des = update.des.trim();
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
    updatePost(id,des);
    setUpdate((prev) => {
      return { ...prev, des: "" };
    });
    
  }

  return (
    <div className="Update-item">
      <form>
        <select value={update.id} onChange={handleSelectChange}>

          <option hidden defaultValue>
            เลือกโพสต์
          </option>

          {props.posts.map((x) => (
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