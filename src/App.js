import "./css/App.css"
import "./css/Media-Query.css";
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PostContext from "./shared/PostContext";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
import Notes from "./Notes/Notes";
import AddNote from "./Adding Note/AddNote";
import Auth from "./Auth/Auth";
import EditRoute from "./Notes/EditRoute";

export default function App() {

  const { isLoading } = useContext(PostContext);

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