import React, { useState } from "react";
import fetchData from "./fetchData";

const PostContext = React.createContext({});

function PostContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userName, setUserName ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  async function refreshData() {
    setIsLoading(true);
    const data = await fetchData();
    setPosts(data.posts);
    setIsLoggedIn(data.isLoggedIn);
    setUserName(data.userName);
    setIsLoading(false);
  }
  
  function logIn() {
    setIsLoggedIn(true);
    refreshData();
  }

  function logOut() {
    setIsLoggedIn(false);
    refreshData();
  }

  function addPost(id,item,des,date) {
    setPosts(prev => {
      return [...prev,{
        _id: id,
        item: item,
        des: des,
        date: date,
      }]
    })
  }

  function deletePost(id) {
    setPosts(prev => {
      return prev.filter((x) => x._id.toString() !== id.toString());
    })  
  }

  function updatePost(id, item, des) {
    setPosts(prev => {
      return prev.map((x) => (x._id.toString() === id.toString() ? { ...x, item: item, des: des } : x))
    })
  }

  const context = {
    // authen
    logIn: logIn,
    logOut: logOut,
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,

    //loading and username
    isLoading: isLoading,
    setIsLoading: setIsLoading,
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