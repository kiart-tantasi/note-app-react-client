import React, { useState, useEffect } from "react";
import generateId from "./generateId";

const PostContext = React.createContext({});

function PostContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userName, setUserName ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  // -------------------- USE EFFECT -------------------- //
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      let initialPosts;
      // Trying getting data from server first if authenticated
      try {
        const response = await fetch("/api/user",{credentials:"include"});
        if (response.ok) {
          const userData = await response.json();
          initialPosts = userData.posts;
          setUserName(userData.userName);
          setIsLoggedIn(true);
        } else {
          throw new Error("offline mode activated")
        }
      // If not authenticated then get data from local storage or just use default posts
      } catch (err) {
        console.log(err.message);
        if (localStorage.getItem("myPostIt")) {
          initialPosts = JSON.parse(localStorage.getItem("myPostIt"));
          // if never updated... 1.0.1
          if (!localStorage.getItem("myPostItUpdate")) {
            const reversedArray = [...initialPosts].reverse();
            localStorage.setItem("myPostIt", JSON.stringify(reversedArray));
            initialPosts = reversedArray;
            localStorage.setItem("myPostItUpdate", JSON.stringify({reversedArray: true}));
          }
        } else {
          initialPosts = [
            {_id: generateId(), item: "โพสต์แรกของฉัน", des:"ดูแลสุขภาพด้วยงับ", date: new Date().getTime()},
            {_id: generateId(), item: "ประชุมเช้า", des:"วันพุธ เข้าzoomก่อน 10 โมง", date: new Date().getTime()},
            {_id: generateId(), item: "จันทร์หน้า", des:"ทำ OT ...", date: new Date().getTime()},
            {_id: generateId(), item: "หยุดปีใหม่", des:"วันศุกร์หน้าแล้ว!", date: new Date().getTime()}
          ];
          localStorage.setItem("myPostIt", JSON.stringify(initialPosts));
          localStorage.setItem("myPostItUpdate", JSON.stringify({reversedArray: true}));
        }
        setIsLoggedIn(false);
      }
      setPosts(initialPosts);
      setIsLoading(false);
    }

    loadData();

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
