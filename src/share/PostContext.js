import React, { useState } from "react";

const PostContext = React.createContext({
  posts: [],
  addPost: () => {},
});

function PostContextProvider(props) {
  const [ isLoading, setLoading ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  function logIn(username,password) {
    const options = {
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username:username, password:password}),
      credentials: "include"
    }
    fetch("http://localhost:4000/login", options)
    .then(res => res.json())
    .then(data => console.log(data));
  }
  
  function fetchData() {
    fetch("http://localhost:4000/posts", {credentials:"include"})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

  }
  
  // IF LOGGED IN

  // logIn("admin","password");
  // fetchData();

  // IF NOT LOGGED IN
  let initialPosts = [
    {_id: "4",item: "หยุดปีใหม่", des:"วันศุกร์หน้าแล้ว!", date: new Date().getTime()},
    {_id: "3",item: "จันทร์หน้า", des:"ทำ OT ...", date: new Date().getTime()},
    {_id: "2",item: "ประชุมเช้า", des:"วันพุธ เข้าzoomก่อน 10 โมง", date: new Date().getTime()},
    {_id: "1",item: "โพสต์แรกของฉัน", des:"ดูแลสุขภาพด้วยงับ", date: new Date().getTime()},
  ];
  if (localStorage.getItem("myPostIt")) {
    initialPosts = JSON.parse(localStorage.getItem("myPostIt"));
  }

  const [posts, setPosts] = useState(initialPosts);

  function addPost(item, des) {
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

  function deletePost(id) {
    const newPosts = posts.filter((x) => x._id.toString() !== id.toString());
    setPosts(newPosts);
    localStorage.setItem("myPostIt", JSON.stringify(newPosts));
  }

  function updatePost(id, des) {
    const newPosts = posts.map((x) => (x._id.toString() === id.toString() ? { ...x, des: des } : x));
    setPosts(newPosts);
    localStorage.setItem("myPostIt", JSON.stringify(newPosts));
  }

  const context = {
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
