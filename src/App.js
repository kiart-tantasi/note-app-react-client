import logo from './logo.svg';
import './App.css';
import React from 'react';
import SelectUpdate from './SelectUpdate'

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
    this.updateItem = this.updateItem.bind(this);
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

  //handleUpdateItem in Component
  updateItem(e) {
    this.setState({itemUpdate: e.target.value})
  }
  // handleUpdateItem(e) {
  //   console.log(e.target.value);
  //   this.setState({itemUpdate: e.target.value})
  // }

  handleUpdateDes(e) {
    this.setState({desUpdate: e.target.value})
  }
  updateDes(e) {
    e.preventDefault();
    const itemToUpdate = this.state.itemUpdate;
    const desToUpdate = this.state.desUpdate;

    const newData = this.state.data;
    newData.map(x => {
      if(x.item === itemToUpdate) {
        x.des = desToUpdate;
      }
      return console.log("Descripton is updated.");
    })
    this.setState({data: newData});

    if (desToUpdate.length === 0) {
      alert("Please enter new descripton.");
    }

    const requestOptions = {
      method: "PATCH",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({des: desToUpdate})
    }
    fetch("/items/"+ itemToUpdate, requestOptions)
      .then(res => res.json())
      .then(resData => console.log(resData))
      
  }

  render() {
    return (
      <div className="App Background">
        <img src={logo} className="App-logo" alt="logo" />

        <div>
          {/* Show Items. */}
          {this.state.data.map(x => 
            <div className="Item-block" key={x._id}>
              <p>Item:</p><h3>{x.item}</h3> <p>Description: {x.des}</p>
              <button value={x._id} name={x.item} onClick={this.deleteItem.bind(this)}>Delete</button>
            </div>
            )}
        </div>

        {/* Add an Item to Database. */}
        <form className="Input-form">
        <h3>Add Item with Description</h3>
          <input onChange={this.handleItemChange.bind(this)} type="text" name="item" id="First-input" placeholder="Name of the Item."></input>
          <input onChange={this.handleDesChange.bind(this)} type="text" name="des" placeholder="Description of Item"></input>
          <button onClick={this.submitInput.bind(this)}>Send Item</button>
        </form>

        {/* Updating Description of an Item. */}
        <form className="Update-item">
          <h3>Update Description</h3>

          <SelectUpdate functionUpdate={this.updateItem} dataState={this.state.data} />
          {/* <select onChange={this.handleUpdateItem.bind(this)}>
            {this.state.data.map(x => {
              return (<option key={x.item} value={x.item}>{x.item}</option>)
            })}
          </select> */}


          <input onChange={this.handleUpdateDes.bind(this)} type="text" name="des" placeholder="New Description here."></input>
          <button onClick={this.updateDes.bind(this)}>Update Description</button>
        </form>
    </div>
    );
  }
}

export default App;
