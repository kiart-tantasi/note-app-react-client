import React from 'react';
import AddNote from '../components/AddNote';
import Notes from "../components/Notes";
import Edit from "../components/EditRoute";
import Popup from '../components/Popup';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { notificationActions } from '../redux-store/notificationSlice';

export default function Main() {    
    const dispatch = useAppDispatch();
    const offlineNotificationIsClosed = useAppSelector(state => state.notification.offlineNotificationIsClosed);

    return (
        <React.Fragment>
            {!offlineNotificationIsClosed && <Popup onClick={() => dispatch(notificationActions.closeOfflineNotification())}>คุณกำลังใช้งานโหมดออฟไลน์</Popup>}
            <AddNote />
            <Notes />
            <Edit />
        </React.Fragment>
    )
}
