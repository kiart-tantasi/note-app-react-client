import React from 'react';
import AddNote from '../components/AddNote';
import Notes from "../components/Notes";
import Edit from "../components/EditRoute";

export default function Main() {
    return (
        <React.Fragment>
            <AddNote />
            <Notes />
            <Edit />
        </React.Fragment>
    )
}
