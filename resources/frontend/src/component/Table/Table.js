import React, {Component} from 'react';
import "./Table.css"

export default class Table extends Component {
    render() {
        const listProps = this.props.columns.map(
            (prop) => <th key={prop}>{prop}</th>
        )
        return (
            <div className="table-container">
                <table className="table is-bordered is-striped is-hoverable is-fullwidth has-text-centered">
                    <thead>
                    <tr>
                        {listProps}
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.children}
                    </tbody>
                </table>
            </div>
        );
    }
}