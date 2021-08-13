import React, {Component} from 'react';
import "./Notification.css"

export default class Notification extends Component {
    constructor(props) {
        super(props);
        setTimeout(this.props.hideNotification, 2000)
    }

    render() {
        return (
            <div className={`buttons ${this.props.isCentered ? "is-centered" : ""} notif customers `}>
                <div className="notification is-primary is-large">
                    <button onClick={this.props.hideNotification} className="delete"/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
