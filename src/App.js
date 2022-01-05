import "./css/App.css"
import "./css/Media-Query.css";
import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PostContext from "./shared/PostContext";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
import Notes from "./Notes/Notes";
import AddNote from "./Adding Note/AddNote";
import Auth from "./Auth/Auth";
import EditRoute from "./Update/EditRoute";
import fetchData from "./shared/fetchData";

export default function App() {
  const { isLoading, setIsLoading, setPosts, setIsLoggedIn, setUserName } = useContext(PostContext);

  useEffect(() => {
    async function refreshData() {
      setIsLoading(true);
      const data = await fetchData();
      setPosts(data.posts);
      setIsLoggedIn(data.isLoggedIn);
      setUserName(data.userName);
      setIsLoading(false);
    }
    refreshData();
  }, [setIsLoading, setIsLoggedIn, setPosts, setUserName]);

  if (isLoading) {
    return <div>
      <h1 style={{"textAlign":"center","marginTop":"30px"}}>LOADING...</h1>
    </div>
  }

  return (
    <div className="flex-container">
      <Nav />
      <div className="flex-main-body">
      <Routes>
        <Route path="/posts/*" element={<div><AddNote /><Notes /><EditRoute /></div>} />
        <Route path="/account" element={<Auth />} />
        <Route path="/*" element={<Navigate to="/posts" />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}