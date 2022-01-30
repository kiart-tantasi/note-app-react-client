import { useState } from 'react';
import useRequest from "../hooks/useRequest";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { postActions } from '../redux-store/postSlice';

export default function Delete(props:{id:string;classProp:string}) {

    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.post.posts);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    const [pending, setPending] = useState(false);
    const { deletePost: deletePostRequest } = useRequest();
    const id = props.id;
  
    function handleDelete() {
        //online deleting
        if (isLoggedIn) {
            setPending(true);
            const requestToDelete = async() => {
                try {
                    await deletePostRequest({id: id.toString()});
                    dispatch(postActions.deletePost(id));
                } catch(error) {
                    const err = error as Error;
                    console.log(err.message || "delete request failed.");
                }
            }
            requestToDelete();
            
        //offline deleting
        } else {
            const newPosts = posts.filter((x) => x._id.toString() !== id.toString());
            localStorage.setItem("myPostIt", JSON.stringify(newPosts));
            dispatch(postActions.deletePost(id));
        }
    }

    return (
        <>
        <button className="delete-button" onClick={handleDelete}>
            {!pending && <DeleteIcon />}
            {pending && <CircularProgress size={20} color="inherit" className={props.classProp} />}
        </button>
        </>
    )
}
