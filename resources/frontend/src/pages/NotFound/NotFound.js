import React from "react";

const NotFound = () => {
    return (
        <div>
            <h3>
                No match for <code>{window.location.pathname}</code>
            </h3>
        </div>
    );
};

export default NotFound;
