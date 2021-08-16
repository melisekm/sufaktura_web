import React, {useEffect} from 'react';
import "./Notification.css"
import {useDispatch} from "react-redux";

const Notification = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(dispatch, 2000, props.hideNotification()) // TODO SEE ERROR
    }, [dispatch]);
    return (
        <div className="level-item">
            <div
                className={`notification ${props.design} is-large`}>
                <button onClick={(e) => dispatch(props.hideNotification())} className="delete"/>
                {props.children}
            </div>
        </div>
    );
};

export default Notification;
