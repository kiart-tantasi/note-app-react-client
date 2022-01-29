import React, { useCallback, useState } from "react";
import useRequest from "../hooks/useRequest";

import { PostModel } from "../models/types"
import { PostContextModel } from "../models/types";
import { initialContext } from "../models/types";

const PostContext = React.createContext<PostContextModel>(initialContext);

const PostContextProvider: React.FC = (props) => {
  const { getPostsAndUserName } = useRequest();
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userName, setUserName ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [offlineIsClosed, setOfflineIsClosed] = useState(false);
  const [trialIsClosed, setTrialIsClosed] = useState(false);

  const getData = useCallback( async() => {
    setIsLoading(true);
    const data: {posts: PostModel[];isLoggedIn: boolean; userName:string} = await getPostsAndUserName();
    const transformedPosts = data.posts.map(x => {
      return{...x, pending: false}
    });
    setPosts(transformedPosts);
    setIsLoggedIn(data.isLoggedIn);
    setOfflineIsClosed(data.isLoggedIn);
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

  function addPost(id: string, item: string, des: string ,date: number) {
    setPosts(prev => {
      return [...prev,{
        _id: id,
        item: item,
        des: des,
        date: date,
        pending: false
      }]
    })
  }

  function deletePost(id: string) {
    setPosts(prev => {
      return prev.filter((x) => x._id.toString() !== id.toString());
    })  
  }

  function editPost(id: string, item: string, des: string) {
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

  function turnPendingOn(id: string) {
    setPosts(prev => {
      return prev.map(x => x._id.toString() === id.toString() ? {...x, pending: true} : x)
    });
  }

  function closeOffline() {
    setOfflineIsClosed(true);
  }

  function closeTrial() {
    setTrialIsClosed(true);
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
    offlineIsClosed,
    closeOffline,
    trialIsClosed,
    closeTrial
  };

  return (
    <PostContext.Provider value={context}>
      {props.children}
    </PostContext.Provider>
  );
}

export default PostContext;
export { PostContextProvider };