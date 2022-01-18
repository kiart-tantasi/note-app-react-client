import React from 'react';
import Edit from "../modals/EditModal";
import {Routes, Route} from "react-router-dom";

export default function EditRoute() {
    return (
        <Routes>
            <Route path="edit">
                <Route path=":postId" element={<Edit />} />
            </Route>
        </Routes>
    )
}
