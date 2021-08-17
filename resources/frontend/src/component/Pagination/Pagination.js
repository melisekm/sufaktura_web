import React from 'react';
import {Link} from "react-router-dom";

const Pagination = () => {
    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <Link className="pagination-previous">Previous</Link>
            <Link className="pagination-next">Next page</Link>
            <ul className="pagination-list">
                <li><Link to={{path: "/customers", per_page: "10", page: "1"}} className="pagination-link"
                          aria-label="Goto page 1">1</Link></li>
                <li><span className="pagination-ellipsis">&hellip;</span></li>
                <li><Link className="pagination-link" aria-label="Goto page 45">45</Link></li>
                <li><Link className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</Link></li>
                <li><Link className="pagination-link" aria-label="Goto page 47">47</Link></li>
                <li><span className="pagination-ellipsis">&hellip;</span></li>
                <li><Link className="pagination-link" aria-label="Goto page 86">86</Link></li>
            </ul>
        </nav>
    )


};

export default Pagination;
