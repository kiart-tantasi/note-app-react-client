import React, { useContext } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import PostContext from "../shared/PostContext";

export default function Delete(props) {

    const { posts, deletePost, isLoggedIn, logOut } = useContext(PostContext);
    const id = props.id;
  
    function handleDelete() {
        //online deleting
        if (isLoggedIn) {
            fetch("/api/posts/"+ id.toString(), {method:"DELETE", credentials: "include"})
            .then((res) => {
                if (res.ok) {
                    deletePost(id)
                } else if (res.status === 403) {
                    logOut();
                    throw new Error("No authentication");
                } else {
                    logOut();
                    throw new Error("deleting failed.")
                }
            })
            .catch(err => console.log(err.message));
        //offline deleting
        } else {
            const newPosts = posts.filter((x) => x._id.toString() !== id.toString());
            localStorage.setItem("myPostIt", JSON.stringify(newPosts));
            deletePost(id);
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
