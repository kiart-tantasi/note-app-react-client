import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return(
        <div className="main-nav">
            <NavLink className="route" to="/" activeClassName="active-route">Browse Items</NavLink>
            <NavLink className="route" to="/add" activeClassName="active-route">Add Items</NavLink>
        </div>
    )
}