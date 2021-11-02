import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Item(props) {
    return (
    <div className="Item-block">
        <p>Item:</p><h3>{props.item}</h3> <p>Description: {props.des}</p>
        <button onClick={() => {
            props.deleteItem(props.id);
        }}><DeleteIcon /></button>
    </div> 
    )
    
}