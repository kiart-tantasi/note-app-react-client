import React, { useEffect, useState } from "react";
import generateId from "./generateId";

const PostContext = React.createContext({});

function PostContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [ isLoading, setLoading ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userName, setUserName ] = useState("");
  const [UseEffect, activateUseEffect] = useState(false);
  
  // -------------------- USE EFFECT -------------------- //
  useEffect(() => {
    async function loadData() {
      setLoading(true);
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
      setLoading(false);
    }

    loadData();

  },[UseEffect]);
  // -------------------- END OF useEffect --------------------//

  // LOG IN
  function logIn() {
    setIsLoggedIn(true);
    activateUseEffect(!UseEffect);
  }

  // LOG OUT
  function logOut() {
    setIsLoggedIn(false);
    activateUseEffect(!UseEffect);
  }

  // ADD A POST
  function addPost(item, des) {
    if (isLoggedIn) {
      const options = {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({item:item,des:des}),
        credentials: "include"
      }
      fetch("/api/posts", options)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else if (res.status === 400) {
          throw new Error("title is requied.")
        } else if (res.status === 403) {
          logOut();
          throw new Error("no authentication");
        }
      })
      .then(data => {
        setPosts(prev => {
          return [...prev,{
            _id: data.id,
            item: item,
            des: des,
            date: data.date,
          }]
        })
      })
      .catch((err) => console.log(err.message))
      return;
    }
    // offline
    const time = new Date().getTime();
    const newPosts = [
      ...posts,{
        _id: generateId(),
        item: item,
        des: des,
        date: time,
      }
    ];
    setPosts(newPosts);
    localStorage.setItem("myPostIt", JSON.stringify(newPosts));
  }

  // DELETE A POST
  function deletePost(id) {
    if (isLoggedIn) {
      fetch("/api/posts/"+ id, {method:"DELETE", credentials: "include"})
      .then((res) => {
        if (res.ok) {
          setPosts(prev => {
            return prev.filter((x) => x._id.toString() !== id.toString());
          })
        } else if (res.status === 403) {
          logOut();
          throw new Error("no authentication");
        } else {
          throw new Error("deleting failed.")
        }
      })
      .catch(err => console.log(err.message));
      return;
    }
    // offline
    const newPosts = posts.filter((x) => x._id.toString() !== id.toString());
    setPosts(newPosts);
    localStorage.setItem("myPostIt", JSON.stringify(newPosts));
  }

  //EDIT A POST
  function updatePost(id, item, des) {
    if (isLoggedIn) {
      const options = {
        method:"PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({item:item,des:des}),
        credentials: "include"
      }
      fetch("/api/posts/"+id, options)
      .then(res => {
        if(res.ok) {
          setPosts(prev => {
            return prev.map((x) => (x._id.toString() === id.toString() ? { ...x, item: item, des: des } : x))
          })
        } else if (res.status === 400) {
          throw new Error("no title defined.")
        } else if (res.status === 403) {
          logOut();
          throw new Error("no authentication")
        } else {
          throw new Error("updating failed.")
        }
      })
      .catch(err => console.log(err.message));
      return;
    }
    // offline
    const newPosts = posts.map((x) => (x._id.toString() === id.toString() ? { ...x, item: item, des: des } : x));
    setPosts(newPosts);
    localStorage.setItem("myPostIt", JSON.stringify(newPosts));
  }

  const context = {
    logIn: logIn,
    logOut: logOut,
    isLoading: isLoading,
    isLoggedIn: isLoggedIn,
    userName: userName,
    posts: posts,
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
