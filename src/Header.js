import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return(
        <div className="main-nav">
            <NavLink className="route" to="/">Note</NavLink>
            <NavLink className="route" to="/update">Update</NavLink>
        </div>
    )
}