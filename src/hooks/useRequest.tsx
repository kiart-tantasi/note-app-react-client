import { useCallback, useContext, useState } from "react";
import getLocalStoragePosts from "../context/getLocalStoragePosts";
import PostContext from "../context/PostContext";

import { AddPostReturn, FetchOptionsModel, PostModel } from "../models/types";
import { FetchDataReturn } from "../models/types";

export default function useRequest() {
    const { logOut } = useContext(PostContext);
    const [isLoading , setIsLoading] = useState(false);
    const [data, setData] = useState<FetchDataReturn | AddPostReturn>();
    const [success, setSuccess] = useState(false);
    
    const getPostsAndUserName = useCallback( async() => {
        setIsLoading(true);
        let initialPosts:PostModel[];
        let userName;
        let isLoggedIn;
        try {
          const response = await fetch("/api/user", {credentials:"include"});
          if (!response.ok) throw new Error("offline mode activated");
          const userData = await response.json();
          initialPosts = userData.posts;
          userName = userData.userName;
          isLoggedIn = true;
        }
        
        catch (error) {
          const localStoragePosts = getLocalStoragePosts();
          initialPosts = localStoragePosts;
          userName = null;
          isLoggedIn = false;
          const err = (error as Error);
          console.log(err.message || "getting posts failed.");
        }

        setIsLoading(false);
        setData({
            posts: initialPosts,
            isLoggedIn: isLoggedIn,
            userName: userName
        });
        return {
            posts: initialPosts,
            isLoggedIn: isLoggedIn,
            userName: userName
        } 
    }, []);
    
    async function addPost(requestData: {item:string;des:string}) {
        setIsLoading(true);

        const options: FetchOptionsModel = {
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
              setIsLoading(false);
              throw new Error("No information sent");
            } else {
              logOut();
              setIsLoading(false);
              throw new Error("No authentication");
            }
        })
        .then(data => {
            setIsLoading(false);
            setData({
                id: data.id,
                date: data.date
            });
            return {
                id: data.id,
                date: data.date
            }
        })
    }

    async function deletePost(requestData:{id:string}) {
        setIsLoading(true);
        setSuccess(false);
        return fetch("/api/posts/"+ requestData.id.toString(), {method:"DELETE", credentials: "include"})
        .then((res) => {
            if (res.ok) {
                setIsLoading(false);
                setSuccess(true);
                return "success";
            } else if (res.status === 403) {
                logOut();
                setIsLoading(false);
                setSuccess(false);
                throw new Error("No authentication");
            } else {
                logOut();
                setIsLoading(false);
                setSuccess(false);
                throw new Error("deleting failed.")
            }
        })
    }

    async function editPost(requestData:{item:string;des:string;id:string}) {
        setIsLoading(true);
        setSuccess(false);
        const options: FetchOptionsModel = {
            method:"PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({item: requestData.item, des:requestData.des}),
            credentials: "include"
        }

        return fetch("/api/posts/" + requestData.id, options)
        .then(response => {
            if(response.ok) {
                setIsLoading(false);
                setSuccess(true);
                return "success";
            } else if (response.status === 400) {
                setIsLoading(false);
                setSuccess(false);
                throw new Error("No information sent")
            } else if (response.status === 403) {
                setIsLoading(false);
                setSuccess(false);
                logOut();
                throw new Error("No authentication")
            } else {
                setIsLoading(false);
                setSuccess(false);
                logOut();
                throw new Error("updating failed.")
            }
        })
    }
    return {getPostsAndUserName, addPost, editPost, deletePost, isLoading, data, success};
}