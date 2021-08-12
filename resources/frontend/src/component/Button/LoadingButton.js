import React, {Component} from 'react';

export default class LoadingButton extends Component {
    render() {
        const centered = this.props.isCentered ? "is-centered" : ""
        return (
            <div className={`buttons ${centered}`}>
                <button className="button is-loading is-link">Loading</button>
            </div>
        );
    }
}
