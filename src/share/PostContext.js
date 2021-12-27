import React, { useEffect, useState } from "react";

const PostContext = React.createContext({
  logIn: () => {},
  logOut: () => {},
  isLoading: false,
  isLoggedIn: false,
  posts: [],
  addPost: () => {},
  deletePost: () => {},
  updatePost: () => {}
});

function PostContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [ isLoading, setLoading ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  
  // USE EFFECT
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      let initialPosts;
      // Trying getting data from server first if authenticated
      try {
        const response = await fetch("/api/user",{credentials:"include"});
        if (response.ok) {
          const res = await fetch("/api/posts",{credentials:"include"});
          const data = await res.json();
          initialPosts = data;
          setIsLoggedIn(true);
        } else {
          throw new Error("offline mode activated")
        }
      // If not authenticated then get data from local storage or just use default posts
      } catch (err) {
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
            {_id: "1",item: "โพสต์แรกของฉัน", des:"ดูแลสุขภาพด้วยงับ", date: new Date().getTime()},
            {_id: "2",item: "ประชุมเช้า", des:"วันพุธ เข้าzoomก่อน 10 โมง", date: new Date().getTime()},
            {_id: "3",item: "จันทร์หน้า", des:"ทำ OT ...", date: new Date().getTime()},
            {_id: "4",item: "หยุดปีใหม่", des:"วันศุกร์หน้าแล้ว!", date: new Date().getTime()}
          ];
          localStorage.setItem("myPostIt", JSON.stringify(initialPosts));
          localStorage.setItem("myPostItUpdate", JSON.stringify({reversedArray: true}));
        }
        setIsLoggedIn(false);
      }
      setLoading(false);
      setPosts(initialPosts);
    }
    //trigger the function
    loadData();
  },[isLoggedIn])

  // LOG IN
  function logIn() {
    setIsLoggedIn(true);
  }

  // LOG OUT
  function logOut() {
    fetch("/api/logout", {credentials:"include", method:"POST"})
    .then(res => {
      if (res.ok) {
        console.log("logged out successfully");
        setIsLoggedIn(false);
      }
    })
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
          setIsLoggedIn(false);
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
    const time = new Date().getTime();
    const newPosts = [
      ...posts,{
        _id: Math.ceil(Math.random() * new Date().getTime() * time).toString(),
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
          setIsLoggedIn(false);
          throw new Error("no authentication");
        } else {
          throw new Error("deleting failed.")
        }
      })
      .catch(err => console.log("Delete Error:", err.message));
      return;
    }
    const newPosts = posts.filter((x) => x._id.toString() !== id.toString());
    setPosts(newPosts);
    localStorage.setItem("myPostIt", JSON.stringify(newPosts));
  }

  //EDIT A POST
  function updatePost(id, des) {
    if (isLoggedIn) {
      const options = {
        method:"PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({des:des}),
        credentials: "include"
      }
      fetch("/api/posts/"+id, options)
      .then(res => {
        if(res.ok) {
          setPosts(prev => {
            return prev.map((x) => (x._id.toString() === id.toString() ? { ...x, des: des } : x))
          })
        } else if (res.status === 403) {
          setIsLoggedIn(false)
          throw new Error("no authentication")
        } else {
          throw new Error("updating failed.")
        }
      })
      .catch(err => console.log(err.message));
      return;
    }
    const newPosts = posts.map((x) => (x._id.toString() === id.toString() ? { ...x, des: des } : x));
    setPosts(newPosts);
    localStorage.setItem("myPostIt", JSON.stringify(newPosts));
  }

  const context = {
    logIn: logIn,
    logOut: logOut,
    isLoading: isLoading,
    isLoggedIn: isLoggedIn,
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
