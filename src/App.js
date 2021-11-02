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
      data: []
    }

    //passing function to another component
    this.submitInput = this.submitInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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
  submitInput(item,des) {
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
      <section className="Background">
        <img src={logo} className="App-logo" alt="logo" />

        <ShowItem state={this.state} deleteItem={this.deleteItem}/>

        {/* Add Item Section && Update Item Section */}
        <div className="Add-update"> 
          <AddItem inputRef={this.inputRef} submitInput={this.submitInput}/>
          <UpdateItem state={this.state.data} updateDes={this.updateDes} />
        </div>
        
    </section>
    );
  }
}

export default App;
