import "./App.css";
import React, { useState, useEffect } from "react";
import ShowNote from "./Showing Note/ShowNote";
import UpdateNote from "./Updating Note/UpdateNote";
import AddNote from "./Adding Note/AddNote";
import Header from "./Header/Header";
import { Routes, Route } from "react-router-dom";

export default function App() {
  //state
  const [data, setData] = useState([]);
  //fetch data
  function fetchData() {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch(() => console.log("No data from database."));
  }
  //useEffect
  useEffect(() => {
    fetchData();
  }, []);

  //Adding
  function submitInput(item, des) {
    if (data.find((x) => x.item === item && x.des === des)) {
      alert("You cannot write the same exact note.");
      return;
    }
    if (item === "" || des === "") {
      alert("Title and Detail are required.");
      return;
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: item, des: des }),
      };
      fetch("/items", requestOptions)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch(() => {
          console.log("Adding Error.");
        });
    }
  }

  //Deleting
  function deleteItem(id) {
    const itemName = data.find((x) => x._id === id).item;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    };
    fetch("/items/" + itemName, requestOptions);
    setTimeout(() => fetchData(), 100);
  }

  //Updating
  function updateDes(item, des) {
    if (des.length === 0) {
      alert("Please enter new descripton.");
      return;
    }
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ des: des }),
    };
    fetch("/items/" + item, requestOptions);
    setTimeout(() => fetchData(), 100);
  }

  //render
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<AddNote submitInput={submitInput} />} />
        <Route
          path="/update"
          element={<UpdateNote data={data} updateDes={updateDes} />}
        />
      </Routes>
      <ShowNote data={data} deleteItem={deleteItem} />
    </div>
  );
}
