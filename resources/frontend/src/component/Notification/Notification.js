import React, {useEffect} from 'react';
import "./Notification.css"
import {useDispatch} from "react-redux";

const Notification = (props) => {
    const dispatch = useDispatch()
    const {hideNotification, design} = props
    useEffect(() => {
        setTimeout(dispatch, 2000, hideNotification())
    }, [dispatch, hideNotification]);
    return (
        <div className="level-item">
            <div
                className={`notification ${design} is-large`}>
                <button onClick={() => dispatch(hideNotification())} className="delete"/>
                {props.children}
            </div>
        </div>
    );
};

export default Notification;
