import React from 'react';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
                isOpen: !this.state.isOpen
            }
        )
    }

    render() {
        return (
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                                <span className="icon">
                                    <i className="fas fa-home"/>
                                </span>
                    </a>
                    <button onClick={this.toggle}
                            className={`navbar-burger ${this.state.isOpen ? "is-active" : ""}`}
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navMenu">
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </button>
                </div>
                <div id="navMenu" className={`navbar-menu ${this.state.isOpen ? "is-active" : ""}`}>
                    <div className="navbar-start">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}