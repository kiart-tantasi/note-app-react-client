import React, { useContext } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import PostContext from "../share/PostContext";

export default function Delete(props) {

    const { deletePost } = useContext(PostContext);
  
    function handleDelete() {
      deletePost(props.id);
    }

    return (
        <>
        <button className="delete-button" onClick={handleDelete}>
            <DeleteIcon />
        </button>
        </>
    )
}
