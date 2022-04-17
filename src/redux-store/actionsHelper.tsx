import { AppDispatch } from ".";
import { authActions } from "./authSlice";
import { loadingActions } from "./loadingSlice";
import { notificationActions } from "./notificationSlice";
import { postActions } from "./postSlice";
import { PostModel } from "../models/types";
import getLocalStoragePosts from "../utilities/getLocalStoragePosts";

export const refreshData = () => {

  return async function(dispatch: AppDispatch) {
    // turn loading state on
    dispatch(loadingActions.turnOnIsLoading());
  
    // prepare 3 things to return
    let initialPosts: PostModel[];
    let userName: string;
    let isLoggedIn: boolean;

    try {
      const response = await fetch("/api/user", {credentials:"include"});
      if (!response.ok) throw new Error("offline mode activated");
      const userData = await response.json();
      //set 3 things (online mode)
      initialPosts = userData.posts;
      userName = userData.userName;
      isLoggedIn = true;
    }
    
    catch (error) {
      // can't fetch /api/user, so we're offline
      const localStoragePosts = getLocalStoragePosts(); // get posts from local storage (both new user and old user)
      // set 3 things (offline mode)
      initialPosts = localStoragePosts;
      userName = "";
      isLoggedIn = false;
      // console log error
      const err = (error as Error);
      console.log(err.message || "getting posts failed.");
    }

    // add pending=false to every post
    const transformedPosts = initialPosts.map(x => {
      return{...x, pending: false}
    });

    // dispatch: posts / login / notification / username / loading state
    dispatch(postActions.setPosts(transformedPosts));
    dispatch(isLoggedIn ? authActions.logIn(): authActions.logOut());
    dispatch(isLoggedIn ? notificationActions.closeOfflineNotification() : notificationActions.openOfflineNotification()); // open noti if offline
    dispatch(authActions.setUserName(userName));
    dispatch(loadingActions.turnOffIsLoading());
  }
};