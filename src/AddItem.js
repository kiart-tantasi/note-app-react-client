import React, { useEffect, useRef, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';

export default function AddItem(props) {
  const [input,setInput] = useState({item:"",des:""});
  const itemRef = useRef();

  useEffect(()=> {
    itemRef.current.focus();
  })

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
          {/* ref={props.inputRef} */}
          <input ref={itemRef} onChange={handleInputChange} value={input.item} type="text" name="item" id="First-input" placeholder="Title"></input>
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
