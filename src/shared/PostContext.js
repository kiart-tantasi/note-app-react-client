import React, { useState, useEffect } from "react";
import fetchData from "./fetchData";
import generateId from "./generateId";

const PostContext = React.createContext({});

function PostContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userName, setUserName ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  // -------------------- USE EFFECT -------------------- //
  useEffect(() => {
    setIsLoading(true);
    async function fetchDataFunction() {
      const data = await fetchData();
      setPosts(data.posts);
      setIsLoggedIn(data.isLoggedIn);
      setUserName(data.userName);
    }
    fetchDataFunction();
    setIsLoading(false);
  }, [isLoggedIn] );
  // -------------------- END OF useEffect --------------------//
  
  // LOG IN
  function logIn() {
    setIsLoggedIn(true);
  }

  // LOG OUT
  function logOut() {
    setIsLoggedIn(false);
  }

  // ADD A POST
  function addPost(id,item,des,date) {
    //online
    if (isLoggedIn) {
      setPosts(prev => {
        return [...prev,{
          _id: id,
          item: item,
          des: des,
          date: date,
        }]
      })
    //offline
    } else {
      const newPosts = [
        ...posts,{
          _id: generateId(),
          item: item,
          des: des,
          date: date,
        }
      ];
      setPosts(newPosts);
      localStorage.setItem("myPostIt", JSON.stringify(newPosts));
    }
  }

  // DELETE A POST
  function deletePost(id) {
    //online
    if (isLoggedIn) {
      setPosts(prev => {
        return prev.filter((x) => x._id.toString() !== id.toString());
      })  
    // offline
    } else {
      const newPosts = posts.filter((x) => x._id.toString() !== id.toString());
      setPosts(newPosts);
      localStorage.setItem("myPostIt", JSON.stringify(newPosts));
    }
  }

  //EDIT A POST
  function updatePost(id, item, des) {
    //online
    if (isLoggedIn) {
      setPosts(prev => {
        return prev.map((x) => (x._id.toString() === id.toString() ? { ...x, item: item, des: des } : x))
      })
    // offline
    } else {
      const newPosts = posts.map((x) => (x._id.toString() === id.toString() ? { ...x, item: item, des: des } : x));
      setPosts(newPosts);
      localStorage.setItem("myPostIt", JSON.stringify(newPosts));
    }
  }

  const context = {
    // authen
    logIn: logIn,
    logOut: logOut,
    isLoggedIn: isLoggedIn,
    // loading
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    // username
    userName: userName,
    setUserName: setUserName,
    // posts
    posts: posts,
    setPosts: setPosts,
    addPost: addPost,
    deletePost: deletePost,
    updatePost: updatePost,
  };

  return (
    <PostContext.Provider value={context}>
      {props.children}
    </PostContext.Provider>
  );
}

export default PostContext;
export { PostContextProvider };