import React from 'react';
import Item from './Item';

export default function showItem(props) {
    return (
    <div className="Show-item">
      {props.state.data.map(x => <Item key={x._id} id={x._id} item={x.item} des={x.des} deleteItem={props.deleteItem}/> )} 
    </div>
    )
}