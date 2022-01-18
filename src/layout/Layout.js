import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <>
      <Nav />
      {props.children}
      <Footer />
    </>
  );
}
