import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

const InvalidPage = () => {
    const pathname = useHistory().location.pathname
    const baseNameIndex = pathname.lastIndexOf("/")
    const paginationName = useSelector(state => state.pagination.name)
    const redirect = paginationName ? "/" + paginationName : pathname.slice(0,baseNameIndex)
    return (
        <React.Fragment>
            <div className="level-item">
                <h3><i className="fas fa-ban"/> Not found :( </h3>
            </div>
            <div className="level-item">
                <Link to={redirect} className="pagination-link is-current"
                      aria-label="Go back">Go back
                </Link>
            </div>
        </React.Fragment>
    );
};

export default InvalidPage;
