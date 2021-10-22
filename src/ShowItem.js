import React from 'react';

export default function showItem(props) {
    return (
        <div className="Show-item">
        {props.state.data.map(x => 
          <div className="Item-block" key={x._id}>
            <p>Item:</p><h3>{x.item}</h3> <p>Description: {x.des}</p>
            <button value={x._id} name={x.item} onClick={props.deleteItem}>Delete</button>
          </div>
          )}
      </div>
    )
}