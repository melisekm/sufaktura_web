import React from 'react';

export default class NavMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }
    }

    componentDidMount() {
        if (this.props.link === window.location.pathname) {
            this.setState({
                isActive: true
            })
        }
    }

    render() {
        return (
            <a className={`navbar-item ${this.state.isActive ? "is-active" : ""}`} href={this.props.link}>
                {this.props.children}
            </a>
        );
    }
}