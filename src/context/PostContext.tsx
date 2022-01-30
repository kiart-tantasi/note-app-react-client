import React, { useCallback, useState } from "react";
import useRequest from "../hooks/useRequest";

import { PostModel } from "../models/types"
import { PostContextModel } from "../models/types";
import { initialContext } from "../models/types";
import { postActions } from "../redux-store/postSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

const PostContext = React.createContext<PostContextModel>(initialContext);

const PostContextProvider: React.FC = (props) => {
  const { getPostsAndUserName, isLoading } = useRequest();
  //
  const dispatch = useAppDispatch();
  const reduxPosts = useAppSelector(state => state.post.posts);
  //
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userName, setUserName ] = useState("");
  const [offlineIsClosed, setOfflineIsClosed] = useState(false);
  const [trialIsClosed, setTrialIsClosed] = useState(false);

  const getData = useCallback( async() => {
    const data: {posts: PostModel[];isLoggedIn: boolean; userName:string} = await getPostsAndUserName();
    const transformedPosts = data.posts.map(x => {
      return{...x, pending: false}
    });
    //  
    dispatch(postActions.setPosts(transformedPosts));
    //
    setIsLoggedIn(data.isLoggedIn);
    setOfflineIsClosed(data.isLoggedIn);
    setUserName(data.userName);
  }, [getPostsAndUserName, dispatch]);
  
  function logIn() {
    setIsLoggedIn(true);
    getData();
  }

  function logOut() {
    setIsLoggedIn(false);
    getData();
  }

  function addPost(id: string, item: string, des: string ,date: number) {
    //
    dispatch(postActions.addPost({id, item, des, date}));
    //
  }

  function deletePost(id: string) {
    //
    dispatch(postActions.deletePost({id}));
    //
  }

  function editPost(id: string, item: string, des: string) {
    //
    dispatch(postActions.editPost({id, item, des}));
    //
  }

  function turnPendingOn(id: string) {
    //
    dispatch(postActions.turnPendingOn({id}));
    //
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
    userName,
    // posts
    getData,
    posts: reduxPosts,
    addPost,
    deletePost,
    editPost,
    turnPendingOn,
    // initiated
    offlineIsClosed,
    closeOffline,
    trialIsClosed,
    closeTrial,
    // etc
    isLoading
  };

  return (
    <PostContext.Provider value={context}>
      {props.children}
    </PostContext.Provider>
  );
}

export default PostContext;
export { PostContextProvider };