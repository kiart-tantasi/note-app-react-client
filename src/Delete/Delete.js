import React, { useContext } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import PostContext from "../shared/PostContext";

export default function Delete(props) {

    const { deletePost, isLoggedIn, logOut } = useContext(PostContext);
  
    function handleDelete() {
        if (isLoggedIn) {
            fetch("/api/posts/"+ props.id.toString(), {method:"DELETE", credentials: "include"})
            .then((res) => {
                if (res.ok) {
                    //online deleting
                    deletePost(props.id)
                } else if (res.status === 403) {
                    logOut();
                    throw new Error("No authentication");
                } else {
                    logOut();
                    throw new Error("deleting failed.")
                }
            })
            .catch(err => console.log(err.message));
        } else {
            //offline deleting
            deletePost(props.id);
        }
    }

    return (
        <>
        <button className="delete-button" onClick={handleDelete}>
            <DeleteIcon />
        </button>
        </>
    )
}
