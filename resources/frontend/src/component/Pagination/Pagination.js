import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import "./Pagination.css"


const Pagination = (props) => {
    const pagination = useSelector(state => state.pagination.pagination)

    if (pagination === null) return null

    const current_page = pagination.current_page
    const last_page = pagination.last_page

    if (current_page > last_page) {
        return (
            <React.Fragment>
                <div className="level-item">
                    <h3><i className="fas fa-ban"/> Not found :( </h3>
                </div>
                <div className="level-item">
                    <Link to={"/customers"} className="pagination-link is-current"
                          aria-label="Go to back">Go back
                    </Link>
                </div>
            </React.Fragment>
        )
    }

    const prev_page = pagination.current_page - 1
    const next_page = pagination.current_page + 1

    const first = "page=1"
    const last = `page=${pagination.last_page}`
    const prev = `page=${current_page - 1}`;
    const next = `page=${current_page + 1}`;


    const prev_icon = current_page !== 1
        ? <li><Link to={{search: prev}} className="pagination-link"
                    aria-label={`Goto page ${prev_page}`}>{prev_page}</Link></li>
        : null

    const prev_btn = <Link to={{search: prev}} className={`pagination-previous ${current_page === 1 ? "disabled" : ""}`}
                           disabled={current_page === 1}>Previous</Link>
    const next_btn = <Link to={{search: next}}
                           className={`pagination-next ${current_page === last_page ? "disabled" : ""}`}
                           disabled={current_page === last_page}>Next page</Link>

    const next_icon = current_page !== last_page
        ? <li><Link to={{search: next}} className="pagination-link"
                    aria-label={`Goto page ${next_page}`}>{next_page}</Link></li>
        : null


    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            {prev_btn}
            {next_btn}
            <ul className="pagination-list">
                <li><Link to={{search: first}} className="pagination-link"
                          aria-label="Goto page 1">1</Link></li>

                <li><span className="pagination-ellipsis">&hellip;</span></li>

                {prev_icon}
                <li>
                    <div className="pagination-link is-current" aria-label={`Page ${current_page}`}
                         aria-current="page">{current_page}</div>
                </li>
                {next_icon}

                <li><span className="pagination-ellipsis">&hellip;</span></li>

                <li><Link to={{search: last}} className="pagination-link"
                          aria-label={`Goto page ${pagination.last_page}`}>{pagination.last_page}</Link></li>
            </ul>
        </nav>
    )
};

export default Pagination;
