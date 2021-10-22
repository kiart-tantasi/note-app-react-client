import React from 'react';

export default function updateItem(props) {
    return (
        <div className="Update-item">
        <form>
            <h3>Update Description</h3>
            <select onChange={props.updateItem}>
                <option hidden defaultValue>select</option>
                {props.state.map(x => <option key={x._id} value={x.item}>{x.item}</option>)}
            </select>
            <input onChange={props.handleUpdateDes} type="text" name="des" placeholder="New Description here."></input>
            <button onClick={props.updateDes}>Update Description</button>
        </form>
    </div>
    )
}