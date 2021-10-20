import React from 'react';

export default function selectUpdate(props) {
    console.log(props);
    const handleChange = (e) => {
        props.functionUpdate(e)
    }
    return (
        <select onChange={handleChange}>
            {props.dataState.map(x => <option key={x._id} value={x.item}>{x.item}</option>)}
        </select>
    )
}

//this is made from below. (To transform class component to functional component)

// class SelectUpdate extends React.Component {
//     handleChange = (e) => {
//         this.props.functionUpdate(e)
//     }
//     render() {
//         const dataArray = this.props.dataState;
//         return (
//             <select onChange={this.handleChange}>
//                 {dataArray.map(x => <option key={x._id} value={x.item}>{x.item}</option>)}
//             </select>
//         )
//     }
// }
// export default SelectUpdate;