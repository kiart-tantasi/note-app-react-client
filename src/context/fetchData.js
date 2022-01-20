import generateId from "./generateId";

export default async function fetchData() {
    let initialPosts;
    let userName;
    let isLoggedIn;
    try {
      const response = await fetch("/api/user",{credentials:"include"});
      if (response.ok) {
        const userData = await response.json();
        initialPosts = userData.posts;
        userName = userData.userName;
        isLoggedIn = true;
      } else {
        throw new Error("offline mode activated")
      }
    } catch (err) {
      console.log(err.message);
      if (localStorage.getItem("myPostIt")) {
        const retrievedPosts = JSON.parse(localStorage.getItem("myPostIt"));
        if (!localStorage.getItem("myPostItUpdate")) {
          const reversedArray = [...retrievedPosts].reverse();
          localStorage.setItem("myPostIt", JSON.stringify(reversedArray));
          initialPosts = reversedArray;
          localStorage.setItem("myPostItUpdate", JSON.stringify({reversedArray: true}));
        } else {
            initialPosts = retrievedPosts;
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
      isLoggedIn = false;
    }
    return {
        posts: initialPosts,
        isLoggedIn: isLoggedIn,
        userName: userName
    } 
}