import "./App.css";
import React from "react";
import ShowNote from "./Showing Note/ShowNote";
import UpdateNote from "./Updating Note/UpdateNote";
import AddNote from "./Adding Note/AddNote";
import Header from "./Header/Header";
import { Routes, Route } from "react-router-dom";

class App extends React.Component {
  //state
  state = { data: [] };

  //passing function to another component
  submitInput = this.submitInput.bind(this);
  deleteItem = this.deleteItem.bind(this);
  updateDes = this.updateDes.bind(this);

  componentDidMount() {
    this.getData();
  }

  // Get Data
  getData = () => {
    fetch("/items")
      .then((res) => res.json())
      .then((resData) => this.setState({ data: resData }))
      .catch(() => {
        console.log("ERROR: No Items from Database.");
      });
  };

  // Add Item
  submitInput(item, des) {
    if (this.state.data.filter((x) => x.item === item).length !== 0) {
      alert("The name is already used.");
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
        .then((resData) => {
          this.setState({ data: resData });
        });
    }
  }

  //Delete Item
  deleteItem(id) {
    const itemName = this.state.data.find((x) => x._id === id).item;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id }),
    };
    fetch("/items/" + itemName, requestOptions);
    setTimeout(() => this.getData(),100);
    // this.setState({ data: this.state.data.filter((x) => x._id !== id) });
  }

  //Update Description
  updateDes(item, des) {
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
    setTimeout(() => this.getData(),100);
    // const newData = this.state.data.map((x) => {
    //   if (x.item === item) {
    //     return {_id:x._id, item:x.item, des: des}
    //   } else {
    //     return x;
    //   }
    // });
    // this.setState({ data: newData });
  }

  // ------------------ RENDER ------------------ //

  render() {
    return (
      <div className="Background">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<AddNote submitInput={this.submitInput} />}
          />
          <Route
            path="/update"
            element={
              <UpdateNote state={this.state.data} updateDes={this.updateDes} />
            }
          />
        </Routes>
        <ShowNote state={this.state} deleteItem={this.deleteItem} />
      </div>
    );
  }
}

export default App;
