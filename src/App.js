import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PostContext from "./context/PostContext";
import Layout from "./layout/Layout";
import Main from "./pages/Main";
import Auth from "./pages/Auth";
import "./App.css";

export default function App() {
  const { getData, isLoading} = useContext(PostContext);

  useEffect(() => {
    getData();
  }, [getData]);

  if (isLoading) {
    return <div>
      <h1 style={{"textAlign":"center","marginTop":"30px"}}>LOADING...</h1>
    </div>
  }

  return (
    <div className="flex-container">
      <Layout>
      <div className="flex-main-body">
      <Routes>
        <Route path="/posts/*" element={<Main />} />
        <Route path="/account" element={<Auth />} />
        <Route path="/*" element={<Navigate to="/posts" />} />
      </Routes>
      </div>
      </Layout>
    </div>
  );
}