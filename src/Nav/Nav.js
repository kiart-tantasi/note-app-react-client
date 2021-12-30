import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="main-nav">
      <NavLink
        className={({ isActive }) => (isActive ? "route-active" : "route")}
        to="/posts"
      >
        โพสต์อิท
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "route-active" : "route")}
        to="/authentication"
      >
        บัญชี
      </NavLink>
    </div>
  );
}