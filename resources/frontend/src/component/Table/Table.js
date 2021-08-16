import React from 'react';
import "./Table.css"

const Table = (props) => {

    const listProps = props.columns.map(
        (prop) => <th key={prop}>{prop}</th>
    )
    return (
        <div className="table-container">
            <table className="table is-bordered is-striped is-hoverable is-fullwidth has-text-centered">
                <thead>
                <tr>{listProps}</tr>
                </thead>
                <tbody>{props.children}</tbody>
            </table>
        </div>
    );
};

export default Table;
