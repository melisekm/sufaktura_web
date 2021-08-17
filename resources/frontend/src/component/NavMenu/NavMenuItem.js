import React from 'react';
import {Link, useLocation} from "react-router-dom";


const NavMenuItem = (props) => {
    const location = useLocation()
    const highlightItem = props.link === location.pathname
    return (
        <Link to={props.link} className={`navbar-item ${highlightItem ? "is-active" : ""}`}>
            {props.children}
        </Link>
    );
};

export default NavMenuItem;
