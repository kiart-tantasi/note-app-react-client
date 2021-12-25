import "./css/App.css"
import "./css/Media-Query.css";
import React, { useContext } from "react";
import ShowNote from "./Showing Note/ShowNote";
import UpdateNote from "./Updating Note/UpdateNote";
import AddNote from "./Adding Note/AddNote";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Routes, Route } from "react-router-dom";
import PostContext from "./share/PostContext";
import Auth from "./Auth/Auth";

export default function App() {

  const { isLoading } = useContext(PostContext);
  const { posts } = useContext(PostContext);

  if (isLoading) {
    return <div>
      <h1 style={{"textAlign":"center","marginTop":"30px"}}>LOADING...</h1>
    </div>
  }

  return (
    <div className="flex-container">
      <Header />
      <div className="flex-main-body">
      <Routes>
        <Route path="/" element={<div><AddNote /><ShowNote posts={posts} /></div>} />
        <Route path="/update" element={<div><UpdateNote posts={posts} /><ShowNote posts={posts} /></div> } />
        <Route path="/authentication" element={<Auth />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}
