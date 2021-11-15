import React, { useRef, useState } from "react";
import Option from "./Option";
import UpdateIcon from "@mui/icons-material/UpdateRounded";

export default function UpdateNote(props) {
  const [update, setUpdate] = useState({ item: "", des: "" });
  const inputRef = useRef();

  function handleChange(e) {
    const { name, value } = e.target;
    inputRef.current.focus();
    setUpdate((prev) => {
      return { ...prev, [name]: value };
    });
  }
  return (
    <div className="Update-item">
      <form>
        <h3>Update</h3>
        <select value={update.item} name="item" onChange={handleChange}>
          <option hidden defaultValue>
            select item
          </option>
          {props.data.map((x) => (
            <Option key={x._id} value={x.item} />
          ))}
        </select>
        <input
          ref={inputRef}
          onChange={handleChange}
          value={update.des}
          type="text"
          name="des"
          placeholder="New Description"
          autoComplete="off"
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.updateDes(update.item, update.des);
            setUpdate(prev => {
              return {...prev,item: "", des: ""};
            });
          }}
        >
          <UpdateIcon />
        </button>
      </form>
    </div>
  );
}

//---Class Component Version---// (Not Updated for A Long Time.)

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
