import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      data: [],
      itemInput: "",
      desInput: "",
      itemUpdate: "",
      desUpdate: ""
    }
  }; 

  componentDidMount() {
    this.callApi();
  }

  // GET
  callApi = () => {
    fetch("/items")
      .then(res => res.json())
      .then(resData => this.setState({data: resData}));
  }

  // Add Item
  handleItemChange(e) {
    this.setState({itemInput: e.target.value})
  }
  handleDesChange(e) {
    this.setState({desInput: e.target.value})
  }

  submitInput(e) {
    e.preventDefault()
    
    if (this.state.data.filter(x => x.item === this.state.itemInput).length !== 0) {
      alert("The name of item is already used.")
      return;
    }

    if (this.state.itemInput === "" || this.state.desInput === "") {
      alert("Can't send any blank fields.")
    } else {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({item: this.state.itemInput, des:this.state.desInput})
    }
    fetch("/items",requestOptions)
      .then(res => res.json())
      .then(resData => this.setState({data: resData}))
    }
  }

  //Delete Item
  deleteItem(e) {
    const itemId= e.target.value;
    const requestOptions = {
      method: "DELETE",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({_id:itemId})
    }
    fetch("/items/"+ e.target.name,requestOptions)
      .then(res => res.json())
      .then(resData => this.setState({data: resData}))
      this.setState({data: this.state.data.filter( x => x._id !== itemId)});
    }

  //Update Description
  handleUpdateItem(e) {
    this.setState({itemUpdate: e.target.value})
  }

  handleUpdateDes(e) {
    this.setState({desUpdate: e.target.value})
  }
  
  updateDes(e) {
    e.preventDefault();
    const itemToUpdate = this.state.itemUpdate;
    const desToUpdate = this.state.desUpdate;
    
    if (desToUpdate.length === 0) {
      console.log("No Descripton Defined.")
      return;
    }

    const requestOptions = {
      method: "PATCH",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({des: desToUpdate})
    }
    fetch("/items/"+ itemToUpdate, requestOptions)
      .then(res => res.json())
      .then(resData => this.setState({data: resData}))
    const newData = this.state.data;
    newData.map(x => {
      if(x.item === itemToUpdate) {
        x.des = desToUpdate;
      }
      return console.log("Descripton is updated.")
    })
    this.setState({data: newData});
  }

  render() {
    const dataState = this.state.data;
    return (
      <div className="App Background">
        <img src={logo} className="App-logo" alt="logo" />
        {dataState.map(x => 
          <div key={Math.random()*777}>
            <h3>Name: {x.item}</h3> <p>Description: {x.des}</p>
            <button value={x._id} name={x.item} onClick={this.deleteItem.bind(this)}>Delete</button>
          </div>
          )}
        {/* <form action="/items" method="POST" className="Input-form"> */}
        <form className="Input-form">
          <input onChange={this.handleItemChange.bind(this)} type="text" name="item" placeholder="Name of the Item."></input>
          <input onChange={this.handleDesChange.bind(this)} type="text" name="des" placeholder="Description of Item"></input>
          <button onClick={this.submitInput.bind(this)}>Send Item</button>
        </form>

        <form className="Update-item">
          <h3>Update Description</h3>
          <input onChange={this.handleUpdateItem.bind(this)} type="text" name="item" placeholder="Name of the Item."></input>
          <input onChange={this.handleUpdateDes.bind(this)} type="text" name="des" placeholder="New Description here."></input>
          <button onClick={this.updateDes.bind(this)}>Update Description</button>
        </form>
    </div>
    );
  }

}



export default App;
