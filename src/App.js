import './App.css';
import React from 'react';
import ShowItem from './ShowItem';
import UpdateItem from './UpdateItem'
import AddItem from './AddItem';
import Header from './Header';
import { Routes, Route } from 'react-router-dom';

class App extends React.Component {
  constructor () {
    super ();

    this.state = {
      data: []
    }

    //passing function to another component
    this.submitInput = this.submitInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateDes = this.updateDes.bind(this);

  }; 

  componentDidMount() {
    this.callApi();
  }

  // Get Data
  callApi = () => {
    fetch("/items")
      .then(res => res.json())
      .then(resData => this.setState({data: resData}));
  }

  // Add Item
  submitInput(item,des) {
    if (this.state.data.filter(x => x.item === item).length !== 0) {
      alert("The name of item is already used.")
      return;
    }
    if (item === "" || des === "") {
      alert("Please define both tite and description.");
      return;
    } else {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({item: item, des:des})
    }
    fetch("/items",requestOptions)
      .then(res => res.json())
      .then(resData => this.setState({data: resData}))
    }
  }

  //Delete Item
  deleteItem(id) {
    const itemName = this.state.data.find(x => x._id === id).item;
    const requestOptions = {
      method: "DELETE",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({_id:id})
    }
    fetch("/items/"+ itemName,requestOptions)
      .then(res => res.json())
      .then(resData => this.setState({data: resData}))
    this.setState({data: this.state.data.filter( x => x._id !== id)});
  }

  //Update Description
  updateDes(item,des) {
    if (des.length === 0) {
      alert("Please enter new descripton.");
      return;
    }
    const requestOptions = {
      method: "PATCH",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({des: des})
    }
    fetch("/items/"+ item, requestOptions)
      .then(res => res.json())
      .then(resData => console.log(resData))
    const newData = this.state.data;
    newData.map(x => {
      if (x.item === item) {
        x.des = des;
      }
      return console.log("Description was updated.");
    });
    this.setState({data:newData})
  }

  // ------------------ RENDER ------------------ //

  render() {
    return (
      <div className="Background">

        <Header />

        <Routes>
          <Route path="/" element={<AddItem submitInput={this.submitInput}/>}/>
          <Route path="/update" element={<UpdateItem state={this.state.data} updateDes={this.updateDes} />} />
        </Routes>
        <ShowItem state={this.state} deleteItem={this.deleteItem}/>

    </div>
    );
  }
}

export default App;
