import React, { useState } from "react";

const LocalStorageContext = React.createContext({
  posts: [],
  addPost: () => {},
});

function LocalStorageContextProvider(props) {
  let initialPosts = [
    {_id: 1,item: "โพสต์แรกของฉัน", des:"ดูแลสุขภาพด้วยงับ", date: 1640098139826},
    {_id: 2,item: "พรุ่งนี้", des:"ไปเที่ยวว!", date: 1640098139826},
    {_id: 3,item: "ประชุมเช้า", des:"เข้าzoomก่อน10โมง..", date: 1640098139826},
    {_id: 4,item: "หยุดปีใหม่", des:"วันศุกร์นี้แล้ววววว", date: 1640098139826},
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
    const newPosts = posts.filter((x) => x._id !== id);
    setPosts(newPosts);
    localStorage.setItem("myPostIt", JSON.stringify(newPosts));
  }

  function updatePost(id, des) {
    const newPosts = posts.map((x) => (x._id === id ? { ...x, des: des } : x));
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
