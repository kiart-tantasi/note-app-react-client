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

export default function App() {

  const { posts } = useContext(PostContext);

  const updateSection =
    posts.length > 0 ? (
      <UpdateNote posts={posts} />
    ) : (
      <div>
        <p>โพสต์อิทกันเลย!</p>
      </div>
    );

  return (
    <div className="flex-container">
      <Header />
      <div className="flex-main-body">
      <Routes>
        <Route path="/" element={<AddNote />} />
        <Route path="/update" element={updateSection} />
      </Routes>
      <ShowNote posts={posts} />
      </div>
      <Footer />
    </div>
  );
}