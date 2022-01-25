import React, { useCallback, useState } from "react";
import useRequest from "../hooks/useRequest";

const PostContext = React.createContext(
  {
    logIn: () => {},
    logOut: () => {},
    isLoggedIn: null,
    isLoading: null,
    userName: null,
    getData: () => {},
    posts: [],
    addPost: (id,item,des,date) => {},
    deletePost:(id) => {},
    editPost: (id, item, des) => {},
    turnPendingOn: (id) => {},
    initiated: null,
    init: () => {}
  }
);

function PostContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userName, setUserName ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const { getPostsAndUserName } = useRequest();

  const [initiated, setInitiated] = useState(false);
  
  const getData = useCallback( async() => {
    setIsLoading(true);
    const data = await getPostsAndUserName();
    const transformedPosts = data.posts.map(x => {
      return{...x, pending: false}
    });
    setPosts(transformedPosts);
    setIsLoggedIn(data.isLoggedIn);
    setUserName(data.userName);
    setIsLoading(false);
  }, [getPostsAndUserName]);
  
  function logIn() {
    setIsLoggedIn(true);
    getData();
  }

  function logOut() {
    setIsLoggedIn(false);
    getData();
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

  function editPost(id, item, des) {
    if (isLoggedIn) {
      setPosts(prev => {
        return prev.map((x) => (x._id.toString() === id.toString() ? { ...x, item: item, des: des, pending: false } : x))
      })
    } else if (!isLoggedIn) {
      setPosts(prev => {
        return prev.map((x) => (x._id.toString() === id.toString() ? { ...x, item: item, des: des} : x))
      })
    }
  }

  function turnPendingOn(id) {
    setPosts(prev => {
      return prev.map(x => x._id.toString() === id.toString() ? {...x, pending: true} : x)
    });
  }

  function init() {
    setInitiated(true);
  }

  const context = {
    // authen
    logIn,
    logOut,
    isLoggedIn,

    //loading and username
    isLoading,
    userName,

    // posts
    getData,
    posts,
    addPost,
    deletePost,
    editPost,

    //pending for editting
    turnPendingOn,

    // initiated
    initiated,
    init
  };

  return (
    <PostContext.Provider value={context}>
      {props.children}
    </PostContext.Provider>
  );
}

export default PostContext;
export { PostContextProvider };