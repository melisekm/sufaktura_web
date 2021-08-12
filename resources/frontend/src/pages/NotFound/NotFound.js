import React from "react";

export default class NotFound extends React.Component{
    render() {
        return (
            <div>
                <h3>
                    No match for <code>{window.location.pathname}</code>
                </h3>
            </div>
        );
    }
}