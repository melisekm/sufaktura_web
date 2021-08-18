import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const InvalidPage = () => {
    const redirect = "/" + useSelector(state => state.pagination.name)
    return (
        <React.Fragment>
            <div className="level-item">
                <h3><i className="fas fa-ban"/> Not found :( </h3>
            </div>
            <div className="level-item">
                <Link to={redirect} className="pagination-link is-current"
                      aria-label="Go to back">Go back
                </Link>
            </div>
        </React.Fragment>
    );
};

export default InvalidPage;
