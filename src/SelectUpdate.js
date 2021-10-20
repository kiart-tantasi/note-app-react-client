import React from 'react';

class SelectUpdate extends React.Component {
    handleChange = (e) => {
        this.props.functionUpdate(e)
    }
    render() {
        return (
            <select onChange={this.handleChange}>
                <option hidden defaultValue>select</option>
                {this.props.dataState.map(x => <option key={x._id} value={x.item}>{x.item}</option>)}
            </select>
        )
    }
}
export default SelectUpdate;