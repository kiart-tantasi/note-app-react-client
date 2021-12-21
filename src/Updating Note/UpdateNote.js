import React, { useRef, useState } from "react";
import UpdateIcon from "@mui/icons-material/UpdateRounded";

export default function UpdateNote(props) {
  const [update, setUpdate] = useState({ id: "", des: "" });
  const inputRef = useRef();

  function handleSelectChange(e) {
    const value = e.target.value;
    inputRef.current.focus();
    setUpdate((prev) => {
      return { ...prev, id: value };
    });
  }

  function handleDesChange(e) {
    const value = e.target.value;
    setUpdate((prev) => {
      return { ...prev, des: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const success = props.updateDes(update.id, update.des);
    if (success) {
      setUpdate((prev) => {
        return { ...prev, des: "" };
      });
    }
  }

  return (
    <div className="Update-item">
      <form>
        <h3>Update</h3>

        <select value={update.id} onChange={handleSelectChange}>
          <option hidden defaultValue>
            เลือกโพสต์
          </option>

          {props.data.map((x) => (
            <option key={x._id} value={x._id}>
              {x.item}
            </option>
          ))}
        </select>

        <input
          className="install-font"
          ref={inputRef}
          onChange={handleDesChange}
          value={update.des}
          type="text"
          name="des"
          placeholder="อัปเดตโพสต์"
          autoComplete="off"
        ></input>

        <button onClick={handleSubmit}>
          <UpdateIcon />
        </button>
      </form>
    </div>
  );
}