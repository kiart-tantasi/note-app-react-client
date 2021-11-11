import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return(
        <div className="main-nav">
            <NavLink className={({ isActive }) => isActive ? "route-active" : "route"} to="/">Note</NavLink>
            <NavLink className={({ isActive }) => isActive ? "route-active" : "route"} to="/update">Update</NavLink>
        </div>
    )
}

