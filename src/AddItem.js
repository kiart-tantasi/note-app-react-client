import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

export default function AddItem(props) {
  const [input,setInput] = useState({item:"",des:""});

  function handleInputChange(e) {
    const {name,value} = e.target;

    setInput(prev => {
      return {...prev,[name]:value}
    })
  }

  return (
      <div className="Add-item">
      <form>
      <h3>Add Item</h3>
        <div className="Two-input">
          <input onChange={handleInputChange} value={input.item} type="text" name="item" id="First-input" placeholder="Title"></input>
          <input onChange={handleInputChange} value={input.des} type="text" name="des" placeholder="Description"></input>
        </div>
        <button onClick={(e) => {
          e.preventDefault();
          props.submitInput(input.item,input.des);
          setInput({item:"",des:""});
        }}><AddIcon /></button>
      </form>
      </div>
  );
};
