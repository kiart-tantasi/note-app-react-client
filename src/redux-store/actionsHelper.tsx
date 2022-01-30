import { AppDispatch } from ".";
import { authActions } from "./authSlice";
import { loadingActions } from "./loadingSlice";
import { notificationActions } from "./notificationSlice";
import { postActions } from "./postSlice";
import { PostModel } from "../models/types";
import getLocalStoragePosts from "../utilities/getLocalStoragePosts";

export const refreshData = () => {

  return async function(dispatch: AppDispatch) {
    dispatch(loadingActions.turnOnIsLoading());
  
    let initialPosts: PostModel[];
    let userName: string;
    let isLoggedIn: boolean;

    try {
      const response = await fetch("/api/user", {credentials:"include"});
      if (!response.ok) throw new Error("offline mode activated");
      const userData = await response.json();
      initialPosts = userData.posts;
      userName = userData.userName;
      isLoggedIn = true;
    }
    
    catch (error) {
      const localStoragePosts = getLocalStoragePosts();
      initialPosts = localStoragePosts;
      userName = "";
      isLoggedIn = false;
      const err = (error as Error);
      console.log(err.message || "getting posts failed.");
    }

    const transformedPosts = initialPosts.map(x => {
      return{...x, pending: false}
    });
    dispatch(postActions.setPosts(transformedPosts));
    dispatch(isLoggedIn ? authActions.logIn(): authActions.logOut());
    dispatch(isLoggedIn ? notificationActions.closeOfflineNotification() : notificationActions.openOfflineNotification());
    dispatch(authActions.setUserName(userName));
    dispatch(loadingActions.turnOffIsLoading());
  }
};