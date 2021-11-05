import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Item(props) {
    return (
    <div className="Item-block">
        <p>Item:</p><h3>{props.item}</h3> <p>Description: <br /> {props.des}</p>
        <button className="delete-button" onClick={() => {
            props.deleteItem(props.id);
        }}><DeleteIcon className="" /></button>
    </div> 
    )
    
}