import styles from "./AddNote.module.css"
import React, { useState, useRef, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import PostContext from "../share/PostContext";
import Alert from "../Modal/Alert";

export default function AddNote(props) {
  const [input, setInput] = useState({ item: "", des: "" });
  const [expanded, setExpanded] = useState(false);
  const titleRef = useRef();
  const desRef = useRef();
  const { addPost } = useContext(PostContext);
  const [alertMessage,setAlertMessage] = useState("");
  const [alertOn, setAlertOn] = useState(false);

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

  function handleKeyPress(e) {
    if (e.key === "Enter" && expanded === true) {
      e.preventDefault();
      desRef.current.focus();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const item = input.item.trim();
    const des = input.des.trim();
    // FAILED
    if (item === "") {
      setAlertMessage("กรุณาระบุหัวข้อ");
      setAlertOn(true);
      return;
    }
    if (item.length > 25) {
      setAlertMessage("หัวข้อยาวเกินไป");
      setAlertOn(true);
      return;
    }
    if (des.length > 90) {
      setAlertMessage("รายละเอียดยาวเกินไป");
      setAlertOn(true);
      return;
    }

    // SUCCESS
    addPost(item, des);
    setInput({ item: "", des: "" });
    titleRef.current.focus();
    return;
  }

  function closeModal() {
    setAlertOn(false);
  }

  window.onclick = function(event) {
      if (event.target === document.querySelector(".close-modal")) {
          closeModal();
      }
  }

  window.onkeydown = (e) => {
    if (alertOn) {
      if (e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
    }
  }

  return (
    <>
    {alertOn && <Alert message={alertMessage} handleButton={closeModal} />}
    <div className="Add-item">
      <form>
        <div className={`Two-input ${expanded ? styles.cursorNone : styles.cursorPointer}`}>
          <input
            className="install-font"
            id="First-input"
            onChange={handleInputChange}
            onClick={handleInputOn}
            onKeyPress={handleKeyPress}
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
              ref={desRef}
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
    </>
  );
}
