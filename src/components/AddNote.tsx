import React, { useState, useRef } from "react";
import Alert from "../modals/AlertModal";
import useRequest from "../hooks/useRequest";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { postActions } from "../redux-store/postSlice";
import generateId from "../utilities/generateId";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from '@mui/material/CircularProgress';
import styles from "./AddNote.module.css"

export default function AddNote() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.post.posts);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const titleRef = useRef<HTMLInputElement>(null);
  const desRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [alertMessage,setAlertMessage] = useState("");
  const [alertOn, setAlertOn] = useState(false);
  const { addPost: addPostRequest } = useRequest();
  const [pending, setPending] = useState(false);

  function handleTitleOn() {
    if (expanded === false) {
      setExpanded(true);
    }
  }

  function handleTitleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      desRef.current!.focus();
    }
  }

  function handleDesKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      titleRef.current!.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // FAILED
    if (expanded === false) {
      setAlertMessage("โปรดระบุข้อความ");
      setAlertOn(true);
      return;
    }
    const item = titleRef.current!.value.trim() || "";
    const des = desRef.current!.value.trim() || "";
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
    //online adding
    if (isLoggedIn) {
      const requestToAddPost = async() => {
        try {
          const addRequestResponse = await addPostRequest({item:item,des:des});
          dispatch(postActions.addPost({id: addRequestResponse.id, item, des, date: addRequestResponse.date}));
          setPending(false);
        } catch (error) {
          const err = error as Error;
          console.log(err.message);
          if (err.message === "No information sent") {
            setPending(false);
          }
        }
      }
      setPending(true);
      requestToAddPost();
    //offline adding
    } else {
      const newItemId = generateId();
      const getDate = new Date().getTime();
      const newPosts = [
        ...posts,{
          _id: newItemId,
          item: item,
          des: des,
          date: getDate,
        }
      ];
      localStorage.setItem("myPostIt", JSON.stringify(newPosts));
      dispatch(postActions.addPost({id: newItemId, item, des, date: getDate}))
    }
    
    titleRef.current!.value = "";
    desRef.current!.value = "";
    desRef.current!.focus();
  }

  function closeModal() {
    setAlertOn(false);
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
    {alertOn && <Alert message={alertMessage} onClose={closeModal} />}
    <div className={styles["Add-item"]}>
      <form onSubmit={handleSubmit}>
        <div className={` ${styles["Two-input"]} ${expanded ? styles.cursorNone : styles.cursorPointer}`}>
          {expanded && <input
            className={styles["title-input"]}
            onKeyDown={handleTitleKeyPress}
            type="text"
            placeholder="หัวข้อ (optional)"
            autoComplete="off"
            ref={titleRef}
          ></input>}
          
          <input
            className={styles["des-input"]}
            onClick={handleTitleOn}
            onKeyDown={handleDesKeyDown}
            type="text"
            placeholder="โพสต์อิท !"
            autoComplete="off"
            ref={desRef}
          ></input>

        </div>
        {!pending && <button
          type="submit"
        >
          <AddIcon />
        </button>}
      </form>
      {pending && <CircularProgress color="inherit" className={styles["spinner-ui"]} />}
    </div>
    </>
  );
}
