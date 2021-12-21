import React, { useState } from "react";

const LocalStorageContext = React.createContext({
  posts: [],
  addPost: () => {},
});

function LocalStorageContextProvider(props) {
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
    posts: posts,
    addPost: addPost,
    deletePost: deletePost,
    updatePost: updatePost,
  };

  return (
    <LocalStorageContext.Provider value={context}>
      {props.children}
    </LocalStorageContext.Provider>
  );
}

export default LocalStorageContext;
export { LocalStorageContextProvider };
