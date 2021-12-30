import React from 'react';
import Update from "./Update";
import {Routes, Route} from "react-router-dom";


export default function EditRoute() {
    return (
        <Routes>
            <Route path="edit">
            <Route path=":postId" element={<Update />} />
            </Route>
        </Routes>
    )
}
