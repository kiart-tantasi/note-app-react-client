import React, { useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function AddNote(props) {
  const [input, setInput] = useState({ item: "", des: "" });
  const [expanded, setExpanded] = useState(false);
  const titleRef = useRef();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleInputOn() {
    if (expanded === false) {
      setExpanded(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const success = props.submitInput(input.item, input.des);
    if(success) {
      setInput({ item: "", des: "" });
      titleRef.current.focus();
      return;
    }
  }

  return (
    <div className="Add-item">
      <form>
        <h3>Let's Post It !</h3>
        <div className="Two-input">
          <input
            className="install-font"
            onChange={handleInputChange}
            onClick={handleInputOn}
            value={input.item}
            type="text"
            name="item"
            id="First-input"
            placeholder={expanded ? "หัวข้อ" : "โพสต์อิท !"}
            autoComplete="off"
            ref={titleRef}
          ></input>

          {expanded && (
            <input
              className="install-font"
              onChange={handleInputChange}
              value={input.des}
              type="text"
              name="des"
              placeholder="รายละเอียด"
              autoComplete="off"
            ></input>
          )}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
        >
          <AddIcon />
        </button>
      </form>
    </div>
  );
}
