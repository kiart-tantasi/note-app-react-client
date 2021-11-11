import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Note(props) {
    return (
    <div className="Item-block">
        <p>Item:</p><h3>{props.item}</h3><p>{props.des}</p>
        <button className="delete-button" onClick={() => {
            props.deleteItem(props.id);
        }}><DeleteIcon className="" /></button>
    </div> 
    )
    
}