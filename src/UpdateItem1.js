import React from 'react';

class UpdateItem extends React.Component {
    // handleChange = (e) => {
    //     this.props.updateItem(e)
    // }
    render() {
        return (
            <div className="Update-item">
                <form>
                    <h3>Update Description</h3>
                    <select onChange={this.props.updateItem}>
                        <option hidden defaultValue>select</option>
                        {this.props.state.map(x => <option key={x._id} value={x.item}>{x.item}</option>)}
                    </select>
                    <input onChange={this.props.handleUpdateDes} type="text" name="des" placeholder="New Description here."></input>
                    <button onClick={this.props.updateDes}>Update Description</button>
                </form>
            </div>
        )
    }
}
export default UpdateItem;