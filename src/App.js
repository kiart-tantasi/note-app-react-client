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
      .catch((error) => console.log(error.message));
  }

  //useEffect
  useEffect(() => {
    fetchData();
  }, []);

  //Adding
  function submitInput(item, des) {
    const itemName = item.trim();
    if (data.find((x) => x.item === itemName)) {
      alert("This title is already used.");
      return;
    }
    if (item === "" || des === "") {
      alert("Title and Detail are required.");
      return;
    } else {
      
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: itemName, des: des }),
      };
      fetch("/items", requestOptions)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  //Deleting
  function deleteItem(name) {
    const requestOptions = {
      method: "DELETE",
    };
    fetch("/items/" + name, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch(() => {
        setData([]);
      });
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
    fetch("/items/" + item, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log("UPDATING ERROR:", error.message));
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
