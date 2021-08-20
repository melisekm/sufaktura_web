import React from 'react';

const Spinner = (props) => {
    const centered = props.isCentered ? "is-centered" : ""
    return (
        <div className={`buttons ${centered}`}>
            <button className="button is-loading is-link">Loading</button>
        </div>
    );
};

export default Spinner;
