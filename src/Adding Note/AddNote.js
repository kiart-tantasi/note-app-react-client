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
    props.submitInput(input.item, input.des);
    setInput({ item: "", des: "" });
    titleRef.current.focus();
  }

  return (
    <div className="Add-item">
      <form>
        <h3>Let's Note !</h3>
        <div className="Two-input">
          <input
            onChange={handleInputChange}
            onClick={handleInputOn}
            value={input.item}
            type="text"
            name="item"
            id="First-input"
            placeholder={expanded ? "Title" : "Note..."}
            autoComplete="off"
            ref={titleRef}
          ></input>

          {expanded && (
            <input
              onChange={handleInputChange}
              value={input.des}
              type="text"
              name="des"
              placeholder="Detail"
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
