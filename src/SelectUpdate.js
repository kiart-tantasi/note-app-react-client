import React from 'react';

class SelectUpdate extends React.Component {
    
    handleChange = (e) => {
        this.props.functionUpdate(e)
    }

    render() {
        const dataArray = this.props.dataState;
        return (
            <select onChange={this.handleChange}>
                {dataArray.map(x => <option key={x._id} value={x.item}>{x.item}</option>)}
            </select>
        )
    }

}

export default SelectUpdate;