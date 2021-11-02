import React from 'react';

{/* <Item key={x._id} id={x._id} item={x.item} description={x.des} deleteItem={props.deleteItem}/> */}

export default function Item(props) {
    return (
    <div className="Item-block">
        <p>Item:</p><h3>{props.item}</h3> <p>Description: {props.des}</p>
        <button onClick={() => {
            props.deleteItem(props.id);
        }}>Delete</button>
    </div> 
    )
    
}