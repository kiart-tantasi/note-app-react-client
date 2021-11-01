import React from 'react';

export default function AddItem(props) {
    return (
        <div className="Add-item">
        <form>
        <h3>Add Item</h3>
          <div className="Two-input">
            <input ref={props.inputRef} onChange={props.handleItemChange} value={props.itemValue} type="text" name="item" id="First-input" placeholder="Name"></input>
            <input onChange={props.handleDesChange} value={props.desValue} type="text" name="des" placeholder="Description"></input>
          </div>
          <button onClick={props.submitInput}>Send Item</button>
        </form>
        </div>
    );
};
