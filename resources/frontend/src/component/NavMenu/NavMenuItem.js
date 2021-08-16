import React from 'react';


const NavMenuItem = (props) => {
    const highlightItem = props.link === window.location.pathname
    return (
        <a className={`navbar-item ${highlightItem ? "is-active" : ""}`} href={props.link}>
            {props.children}
        </a>
    );
};

export default NavMenuItem;
