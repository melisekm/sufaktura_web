import React, {useState} from 'react';


const NavBar = (props) => {
    const [isHamburgerOpen, setHamburgerOpen] = useState(false)

    const toggleHamburgerMenu = () => {
        setHamburgerOpen(!isHamburgerOpen)
    }
    return (
        <div className="container">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                                <span className="icon">
                                    <i className="fas fa-home"/>
                                </span>
                </a>
                <button onClick={toggleHamburgerMenu}
                        className={`navbar-burger ${isHamburgerOpen ? "is-active" : ""}`}
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navMenu">
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </button>
            </div>
            <div id="navMenu" className={`navbar-menu ${isHamburgerOpen ? "is-active" : ""}`}>
                <div className="navbar-start">
                    {props.children}
                </div>
            </div>
        </div>
    )
};

export default NavBar;
