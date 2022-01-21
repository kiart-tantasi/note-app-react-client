import { useCallback, useContext } from "react";
import getLocalStoragePosts from "../context/getLocalStoragePosts";
import PostContext from "../context/PostContext";

export default function useRequest() {

    const {logOut} = useContext(PostContext);
    
    const getPostsAndUserName = useCallback( async() => {
        let initialPosts;
        let userName;
        let isLoggedIn;

        try {
          const response = await fetch("/api/user",{credentials:"include"});
          if (!response.ok) throw new Error("offline mode activated");
          const userData = await response.json();
          initialPosts = userData.posts;
          userName = userData.userName;
          isLoggedIn = true;
        }
        
        catch (err) {
          const localStoragePosts = getLocalStoragePosts();
          initialPosts = localStoragePosts;
          userName = null;
          isLoggedIn = false;
          console.log(err.message || "getting posts failed.");
        }
        
        return {
            posts: initialPosts,
            isLoggedIn: isLoggedIn,
            userName: userName
        } 
    }, []);
    
    async function addPost(requestData) {
        const options = {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ item: requestData.item, des: requestData.des }),
            credentials: "include"
        }

        return fetch("/api/posts", options)
        .then((response) => {
            if (response.ok) {
              return response.json();
            } else if (response.status === 400) {
              throw new Error("No information sent");
            } else {
              logOut();
              throw new Error("No authentication");
            }
        })
        .then(data => {
            return {
                id: data.id,
                date: data.date
            }
        })
    }

    async function deletePost(requestData) {
        return fetch("/api/posts/"+ requestData.id.toString(), {method:"DELETE", credentials: "include"})
        .then((res) => {
            if (res.ok) {
                return "success";
            } else if (res.status === 403) {
                logOut();
                throw new Error("No authentication");
            } else {
                logOut();
                throw new Error("deleting failed.")
            }
        })
    }

    async function editPost(requestData) {
        const options = {
            method:"PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({item: requestData.item, des:requestData.des}),
            credentials: "include"
        }

        return fetch("/api/posts/" + requestData.id, options)
        .then(response => {
            if(response.ok) {
                return "success";
            } else if (response.status === 400) {
                throw new Error("No information sent")
            } else if (response.status === 403) {
                logOut();
                throw new Error("No authentication")
            } else {
                logOut();
                throw new Error("updating failed.")
            }
        })
    }
    return {getPostsAndUserName, addPost, editPost, deletePost};
}