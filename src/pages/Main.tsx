import React from 'react';
import AddNote from '../components/AddNote';
import Notes from "../components/Notes";
import Edit from "../components/EditRoute";
import Popup from '../modals/Popup';

import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { notificationActions } from '../redux-store/notificationSlice';
import { useNavigate } from 'react-router-dom';

export default function Main() {    
    const dispatch = useAppDispatch();
    const offlineNotificationIsClosed = useAppSelector(state => state.notification.offlineNotificationIsClosed);

    const navigate = useNavigate();
    const handleNavigateToAuthPage = () => {
        navigate("/account");
    }
    const onConfirm = {
        fn: handleNavigateToAuthPage,
        text: "ลองเลย!"
    }

    return (
        <React.Fragment>
            {!offlineNotificationIsClosed && 
            <Popup 
                onClick={() => dispatch(notificationActions.closeOfflineNotification())} 
                extraText="ใช้งานโหมดออนไลน์เพื่อประสิทธิภาพสูงสุด!" 
                onConfirm={onConfirm}>
                คุณกำลังใช้งานโหมดออฟไลน์
            </Popup>
            }
            <AddNote />
            <Notes />
            <Edit />
        </React.Fragment>
    )
}
