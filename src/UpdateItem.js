import React from 'react';

    //---Class Component Version---//

// class UpdateItem extends React.Component {
//     render() {
//         return (
//             <div className="Update-item">
//                 <form>
//                     <h3>Update Description</h3>
//                     <select onChange={this.props.updateItem}>
//                         <option hidden defaultValue>select</option>
//                         {this.props.state.map(x => <option key={x._id} value={x.item}>{x.item}</option>)}
//                     </select>
//                     <input onChange={this.props.handleUpdateDes} type="text" name="des" placeholder="New Description here."></input>
//                     <button onClick={this.props.updateDes}>Update Description</button>
//                 </form>
//             </div>
//         )
//     }
// }
// export default UpdateItem;


    //---Functional Component Version---//

export default function updateItem(props) {
    return (
        <div className="Update-item">
        <form>
            <h3>Update Description</h3>
            <select onChange={props.updateItem}>
                <option hidden defaultValue>select item</option>
                {props.state.map(x => <option key={x._id} value={x.item}>{x.item}</option>)}
            </select>
            <input onChange={props.handleUpdateDes} type="text" name="des" placeholder="New Description"></input>
            <button onClick={props.updateDes}>Update Description</button>
        </form>
    </div>
    )
}