import "./App.css";
import "./Media-Query.css";
import React, { useContext } from "react";
import ShowNote from "./Showing Note/ShowNote";
import UpdateNote from "./Updating Note/UpdateNote";
import AddNote from "./Adding Note/AddNote";
import Header from "./Header/Header";
import { Routes, Route } from "react-router-dom";
import LocalStorageContext from "./share/LocalStorageContext";

export default function App() {

  const LocalStorageCTX = useContext(LocalStorageContext);
  const data = LocalStorageCTX.posts;
  const addPost = LocalStorageCTX.addPost;
  const deletePost = LocalStorageCTX.deletePost;
  const updatePost = LocalStorageCTX.updatePost;

  //ADDING
  function submitInput(item, des) {

    // Fill(s) is/are blanks.
    if (item === "" || des === "") {
      alert("โปรดระบุหัวข้อและรายละเอียด");
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

    const itemName = item.trim();
    addPost(itemName, des);
    return "success";
  }

  //DELETING
  function deleteItem(id) {
    deletePost(id);
    return "success";
  }

  //UPDATING
  function updateDes(id, des) {
    if (des.length === 0) {
      alert("โปรดระบุรายละเอียดการอัปเดต");
      return;
    }
    updatePost(id,des);
    return "success";
  }

  const updateSection =
    data.length > 0 ? (
      <UpdateNote data={data} updateDes={updateDes} />
    ) : (
      <div>
        <p>โพสต์อิทกันเลย!</p>
      </div>
    );

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<AddNote submitInput={submitInput} />} />
        <Route path="/update" element={updateSection} />
      </Routes>
      <ShowNote data={data} deleteItem={deleteItem} />
    </div>
  );
}