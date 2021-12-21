import "./App.css";
import "./Media-Query.css";
import React, { useState, useContext } from "react";
import ShowNote from "./Showing Note/ShowNote";
import UpdateNote from "./Updating Note/UpdateNote";
import AddNote from "./Adding Note/AddNote";
import Header from "./Header/Header";
import { Routes, Route } from "react-router-dom";
import LocalStorageContext from "./share/LocalStorageContext";

export default function App() {
  //state
  const LocalStorageCTX = useContext(LocalStorageContext);
  const [data, setData] = useState([]);

  useState(() => {
    console.log(LocalStorageCTX.posts);
  },[])

  //fetch data
  // function fetchData() {
  //   fetch("http://localhost:5000/items")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((error) => console.log(error.message));
  // }

  //Adding
  function submitInput(item, des) {

    // Fill(s) is/are blanks.
    if (item === "" || des === "") {
      alert("โปรดระบุหัวข้อและรายละเอียด");
      return;
    }
    // Title is longer than 20 characters.
    if (item.length > 20) {
      alert("หัวข้อมีความยาวเกินไป");
      return;
    }
    // Description is longer than 90 characters.
    if (des.length > 90) {
      alert("รายละเอียดมีความยาวเกินไป");
      return;
    }

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ item: itemName, des: des, date: getTimeNow }),
    // };
    // fetch("http://localhost:5000/items", requestOptions)
    //   .then((res) => res.json())
    //   .then((data) => setData(data))
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    const itemName = item.trim();
    LocalStorageCTX.addPost(itemName, des);
    return "success";
  }

  //Deleting
  function deleteItem(id) {
    // const requestOptions = {
    //   method: "DELETE",
    // };
    // fetch("http://localhost:5000/items/" + id, requestOptions)
    //   .then((res) => {
    //     if (res.ok) {
    //       setData((prev) => {
    //         return prev.filter((x) => x._id !== id);
    //       });
    //     }
    //   })
    //   .catch((error) => console.log("DELETING ERROR:", error.message));
    alert("Deleted.")
  }

  //Updating
  function updateDes(id, des) {
    if (des.length === 0) {
      alert("โปรดระบุรายละเอียดการอัปเดต");
      return;
    }
    // const requestOptions = {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ des: des }),
    // };
    // fetch("http://localhost:5000/items/" + id, requestOptions)
    //   .then((res) => {
    //     if (res.ok) {
    //       setData((prev) => {
    //         return prev.map((x) => (x._id === id ? { ...x, des: des } : x));
    //       });
    //     }
    //   })
    //   .catch((error) => console.log("UPDATING ERROR:", error.message));
    alert("Updated.")
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