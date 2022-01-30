export type PostModel = {_id: string, item: string, des: string, date: number, pending: boolean};

export type PostContextModel = {
    logIn: () => void;
    logOut: () => void;
    isLoggedIn: boolean;
    isLoading: boolean;
    userName: string;
    getData: () => Promise<void>;
    posts: PostModel[];
    addPost: (id: string, item: string, des: string, date: number) => void;
    deletePost: (id: string) => void;
    editPost: (id: string, item: string, des: string) => void;
    turnPendingOn: (id: string) => void;
    offlineIsClosed: boolean;
    closeOffline: () => void;
    trialIsClosed: boolean;
    closeTrial: () => void;
}

export const initialContext = {
    logIn: () => {},
    logOut: () => {},
    isLoggedIn: false,
    isLoading: false,
    userName: "",
    getData: async() => {},
    posts: [],
    addPost: (id: string, item: string, des: string, date: number) => {},
    deletePost: (id: string) => {},
    editPost: (id: string, item: string, des: string) => {},
    turnPendingOn: (id: string) => {},
    offlineIsClosed: false,
    closeOffline: () => {},
    trialIsClosed: false,
    closeTrial: () => {}
  }

export type FetchOptionsModel = {method:string; headers: {}; body: string; credentials: RequestCredentials;}

//useRequest
export type FetchDataReturn = {
  posts: PostModel[];
  isLoggedIn: boolean;
  userName: string;
}
export type AddPostReturn = {
  id: string;
  date: number;
}