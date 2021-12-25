import React, { useEffect, useState } from "react";

const PostContext = React.createContext({
  posts: [],
  addPost: () => {},
});

function PostContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [ isLoading, setLoading ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  
  // USE EFFECT
  useEffect(() => {
    async function loadData() {



      let initialPosts;
      setLoading(true);
      try {
        // Check if authenticated
        const response = await fetch("http://localhost:4000/user",{credentials:"include"});
        // Try getting data from server first
        if (response.ok) {
          const res = await fetch("http://localhost:4000/posts",{credentials:"include"});
          const data = await res.json();
          initialPosts = data;
          setIsLoggedIn(true);
        } else {
          throw new Error("offline mode activated")
        }
      } catch (err) {
        console.log(err.message);
        // Check if there is data from local storage
        if (localStorage.getItem("myPostIt")) {
          initialPosts = JSON.parse(localStorage.getItem("myPostIt"));
        } else {
          initialPosts = [
            {_id: "4",item: "หยุดปีใหม่", des:"วันศุกร์หน้าแล้ว!", date: new Date().getTime()},
            {_id: "3",item: "จันทร์หน้า", des:"ทำ OT ...", date: new Date().getTime()},
            {_id: "2",item: "ประชุมเช้า", des:"วันพุธ เข้าzoomก่อน 10 โมง", date: new Date().getTime()},
            {_id: "1",item: "โพสต์แรกของฉัน", des:"ดูแลสุขภาพด้วยงับ", date: new Date().getTime()},
          ];
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
  function logIn(username,password) {
    const options = {
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username:username, password:password}),
      credentials: "include"
    }
    fetch("http://localhost:4000/login", options)
    .then(res => {
      if (res.ok) {
        console.log("logged in successfully");
        setIsLoggedIn(true);
      }
    })
  }

  // LOG OUT
  function logOut() {
    fetch("http://localhost:4000/logout", {credentials:"include", method:"POST"})
    .then(res => {
      if (res.ok) {
        console.log("logged out successfully");
        setIsLoggedIn(false)
      }
    })
  }

  //FETCH DATA
  function fetchData() {
    fetch("http://localhost:4000/posts", {credentials:"include"})
    .then(res => res.json())
    .then(data => {
      console.log("fetchedData:", data);
      setPosts(data);
    })
    .catch(err => console.log(err));
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
      fetch("http://localhost:4000/posts", options)
      .then((res) => {
        if (res.ok) {
          console.log("added.");
        } else {
          alert("adding post failed!")
        }
      })
      return;
    }
    const time = new Date().getTime();
    const newPosts = [
      {
        _id: Math.ceil(Math.random() * 543 * time).toString(),
        item: item,
        des: des,
        date: time,
      },
      ...posts,
    ];
    setPosts(newPosts);
    localStorage.setItem("myPostIt", JSON.stringify(newPosts));
  }

  // DELETE A POST
  function deletePost(id) {
    if (isLoggedIn) {return}
    const newPosts = posts.filter((x) => x._id.toString() !== id.toString());
    setPosts(newPosts);
    localStorage.setItem("myPostIt", JSON.stringify(newPosts));
  }

  //EDIT A POST
  function updatePost(id, des) {
    if (isLoggedIn) {return}
    const newPosts = posts.map((x) => (x._id.toString() === id.toString() ? { ...x, des: des } : x));
    setPosts(newPosts);
    localStorage.setItem("myPostIt", JSON.stringify(newPosts));
  }

  const context = {
    logIn: logIn,
    logOut: logOut,
    fetchData: fetchData,
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
