import React, { useContext } from 'react';
import PostContext from '../context/PostContext';

import AddNote from '../components/AddNote';
import Notes from "../components/Notes";
import Edit from "../components/EditRoute";
import Popup from '../components/Popup';

export default function Main() {

    const {offlineIsClosed, closeOffline} = useContext(PostContext);

    return (
        <React.Fragment>
            {!offlineIsClosed && <Popup onClick={closeOffline}>คุณกำลังใช้งานโหมดออฟไลน์</Popup>}
            <AddNote />
            <Notes />
            <Edit />
        </React.Fragment>
    )
}
