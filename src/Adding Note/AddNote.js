import styles from "./AddNote.module.css"
import React, { useState, useRef, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import PostContext from "../share/PostContext";

export default function AddNote(props) {
  const [input, setInput] = useState({ item: "", des: "" });
  const [expanded, setExpanded] = useState(false);
  const titleRef = useRef();
  const { addPost } = useContext(PostContext);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleInputOn() {
    if (expanded === false) {
      setExpanded(true);
      
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const item = input.item.trim();
    const des = input.des.trim();
    // FAILED
    // Fill(s) is/are blanks.
    if (item === "") {
      alert("กรุณาระบุหัวข้อ");
      return;
    }
    // Title is longer than 20 characters.
    if (item.length > 20) {
      alert("หัวข้อยาวเกินไป");
      return;
    }
    // Description is longer than 90 characters.
    if (des.length > 90) {
      alert("รายละเอียดยาวเกินไป");
      return;
    }

    // SUCCESS
    addPost(item, des);
    setInput({ item: "", des: "" });
    titleRef.current.focus();
    return;
  }

  return (
    <div className="Add-item">
      <form>
        <div className={`Two-input ${expanded ? styles.cursorNone : styles.cursorPointer}`}>
          <input
            className="install-font"
            id="First-input"
            onChange={handleInputChange}
            onClick={handleInputOn}
            value={input.item}
            type="text"
            name="item"
            placeholder={expanded ? "หัวข้อ" : "โพสต์อิท !"}
            autoComplete="off"
            ref={titleRef}
          ></input>

          {expanded && (
            <input
              className="install-font"
              id="Second-input"
              onChange={handleInputChange}
              value={input.des}
              type="text"
              name="des"
              placeholder="รายละเอียด"
              autoComplete="off"
            ></input>
          )}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
        >
          <AddIcon />
        </button>
      </form>
    </div>
  );
}
