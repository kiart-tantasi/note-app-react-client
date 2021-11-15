//App.js in Class Component Version last updated on Nov 16th.
class AppClassComponent extends React.Component {
    //state
    state = { data: [] };
    //passing function to another component
    submitInput = this.submitInput.bind(this);
    deleteItem = this.deleteItem.bind(this);
    updateDes = this.updateDes.bind(this);
    //useEffect
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
      setTimeout(() => this.getData(), 100);
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
      setTimeout(() => this.getData(), 100);
    }
  
    // ------------------ RENDER ------------------ //
    render() {
      return (
        <div>
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