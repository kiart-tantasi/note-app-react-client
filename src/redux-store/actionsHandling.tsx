import { useAppDispatch } from "../hooks/useRedux";
import useRequest from "../hooks/useRequest";
import { PostModel } from "../models/types";
import { authActions } from "./authSlice";
import { notificationActions } from "./notificationSlice";
import { postActions } from "./postSlice";

export const getData = async() => {
    const {getPostsAndUserName} = useRequest();
    const dispatch = useAppDispatch();

    // isLoading ????

    const data: {posts: PostModel[];isLoggedIn: boolean; userName:string} = await getPostsAndUserName();
    
    const transformedPosts = data.posts.map(x => {
      return{...x, pending: false}
    });

    dispatch(postActions.setPosts(transformedPosts));

    dispatch(data.isLoggedIn ? authActions.logIn(): authActions.logOut());

    dispatch(data.isLoggedIn ? notificationActions.closeOfflineNotification() : notificationActions.openOfflineNotification());

    dispatch(authActions.setUserName(data.userName));
};