import logo from './logo.svg';
import './App.css';
import React, {createRef} from 'react';
import ShowItem from './ShowItem';
import UpdateItem from './UpdateItem' //You can also use './SelectUpdate2' to use functional component (The same thing.)
import AddItem from './AddItem';


class App extends React.Component {
  constructor () {
    super ();

    this.state = {
      data: [],
      itemInput: "",
      desInput: "",
      itemUpdate: "",
      desUpdate: ""
    }
    //passing function to another component
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleUpdateDes = this.handleUpdateDes.bind(this);
    this.updateDes = this.updateDes.bind(this);
    //createRef
    this.inputRef = createRef();
  }; 

  componentDidMount() {
    this.inputRef.current.focus();
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
  updateItem(e) {
    this.setState({itemUpdate: e.target.value})
  }

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
      return console.log("Descripton in Component State was Updated.");
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

  // ------------------ RENDER ------------------ //

  render() {
    return (
      <section className="Background">
        <img src={logo} className="App-logo" alt="logo" />

        <ShowItem state={this.state} deleteItem={this.deleteItem}/>

        <div className="Add-update"> {/* Add Item Section && Update Item Section */}

          <AddItem inputRef={this.inputRef} handleItemChange={this.handleItemChange.bind(this)} itemValue={this.state.itemInput}
          handleDesChange={this.handleDesChange.bind(this)} desValue={this.state.desInput} submitInput={this.submitInput.bind(this)}/>

          <UpdateItem state={this.state.data} updateItem={this.updateItem} selectValue={this.state.itemUpdate} desValue={this.state.desUpdate} handleUpdateDes={this.handleUpdateDes} updateDes={this.updateDes} />
        
        </div>
        
    </section>
    );
  }
}

export default App;
