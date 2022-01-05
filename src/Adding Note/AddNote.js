import styles from "./AddNote.module.css"
import React, { useState, useRef, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import PostContext from "../shared/PostContext";
import Alert from "../Modal/Alert";

export default function AddNote(props) {
  const titleRef = useRef();
  const desRef = useRef();
  const [expanded, setExpanded] = useState(false);
  const [alertMessage,setAlertMessage] = useState("");
  const [alertOn, setAlertOn] = useState(false);
  const { addPost, isLoggedIn, logOut } = useContext(PostContext);

  function handleTitleOn() {
    if (expanded === false) {
      setExpanded(true);
    }
  }

  function handleTitleKeyPress(e) {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      e.preventDefault();
      desRef.current.focus();
    }
  }

  function handleDesKeyDown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      titleRef.current.focus();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // FAILED
    if (expanded === false) {
      setAlertMessage("โปรดระบุข้อความ");
      setAlertOn(true);
      return;
    }
    
    const item = titleRef.current.value.trim() || "";
    const des = desRef.current.value.trim() || "";
    if (!item && !des) {
      setAlertMessage("โปรดระบุข้อความ");
      setAlertOn(true);
      return;
    }
    if (item.length > 25) {
      setAlertMessage("หัวข้อยาวเกินไป");
      setAlertOn(true);
      return;
    }
    if (item.length !== 0 && des.length > 95) {
      setAlertMessage("รายละเอียดยาวเกินไป");
      setAlertOn(true);
      return;
    } else if (item.length === 0 && des.length > 120) {
      setAlertMessage("รายละเอียดยาวเกินไป");
      setAlertOn(true);
      return;
    }

    // SUCCESS
    if (isLoggedIn) {
      const options = {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({item:item,des:des}),
        credentials: "include"
      }
      fetch("/api/posts", options)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else if (res.status === 400) {
          throw new Error("No information sent")
        } else {
          logOut();
          throw new Error("No authentication");
        }
      })
      .then(data => {
        //online adding
        addPost(data.id,item,des,data.date);
      })
      .catch((err) => console.log(err.message))
    } else {
      //offline adding
      const getDate = new Date().getTime();
      addPost("", item, des, getDate);
    }
    
    titleRef.current.value = "";
    desRef.current.value = "";
    desRef.current.focus();
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
          {expanded && <input
            className="install-font"
            onKeyDown={handleTitleKeyPress}
            type="text"
            placeholder="หัวข้อ"
            autoComplete="off"
            ref={titleRef}
          ></input>}
          
          <input
            className="install-font"
            onClick={handleTitleOn}
            onKeyDown={handleDesKeyDown}
            type="text"
            placeholder="โพสต์อิท !"
            autoComplete="off"
            ref={desRef}
          ></input>

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
