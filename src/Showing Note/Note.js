import React, {useState} from "react";
import Delete from "./Delete";
import UpdateModal from "./UpdateModal";
import EditIcon from '@mui/icons-material/Edit';

export default function Note(props) {
  const [ isUpdateModal, setIsUpdateModal ] = useState(false);
  const date = new Date(props.date).getDate().toString() + "/" + ( new Date(props.date).getMonth() + 1 ).toString() + "/" + new Date(props.date).getFullYear().toString() || "no date described.";

  function handleEditTwo() {
    setIsUpdateModal(true);
  }
  function closeModalTwo() {
    setIsUpdateModal(false)
  }

  return (
    <div className="Item-block">

      <div className="item-block-flex">
        <div className="item-block-flex-heading">
          <h3>{props.item}</h3>
        </div>
        <div className="item-block-flex-body">
          <p className="description-text">{props.des}</p>
        </div>
        <div className="item-block-footer item-block-flex-footer">
          <p className="date-text">{date}</p>
          <div className="footer-buttons">
            <button onClick={handleEditTwo}>
              <EditIcon />
            </button>
            <Delete id={props.id} />
          </div>
        </div>
      </div>

    {isUpdateModal && <UpdateModal closeModal={closeModalTwo} id={props.id} item={props.item} des={props.des} />}

    </div>
  );
}