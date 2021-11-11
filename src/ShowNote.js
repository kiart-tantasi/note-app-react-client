import React from 'react';
import Note from './Note';

export default function ShowNote(props) {
    return (
    <div className="Show-item">
      {props.state.data.map(x => <Note key={x._id} id={x._id} item={x.item} des={x.des} deleteItem={props.deleteItem}/> )} 
    </div>
    )
}