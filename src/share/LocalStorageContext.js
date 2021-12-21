import React, { useState } from "react";

const LocalStorageContext = React.createContext([]);

function LocalStorageContextProvider(props) {
  let initialPost = [
    {
      _id: "0001",
      item: "โพสต์แรกของฉัน",
      des: "ดูแลสุขภาพด้วยนะครับ",
      date: 1640086692179,
      __v: 0,
    },
  ];
  if (localStorage.getItem("posts")) {
      initialPost = JSON.parse(localStorage.getItem("posts"));
  }
  const [posts, setPosts] = useState(initialPost);

  function addPost(item, des) {
      const time = new Date().getTime();
      const newPosts = [{ _id: Math.random() * time, item: item, des: des, date: time },...posts]
      setPosts(newPosts);
      localStorage.setItem("posts", JSON.stringify({myPosts: newPosts}));
  }

  const context = {
    posts: posts,
    addPost: addPost,
  };
  return (
    <LocalStorageContext.Provider value={context}>
      {props.children}
    </LocalStorageContext.Provider>
  );
}

export default LocalStorageContext;
export { LocalStorageContextProvider };
